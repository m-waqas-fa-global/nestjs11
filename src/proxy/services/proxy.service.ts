import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as http from 'http';
import * as https from 'https';
import * as net from 'net';
import * as url from 'url';
import { DomainBlockService } from './domain-block.service';
import { PROXY_PORT } from 'src/common/config/proxy.config';

@Injectable()
export class ProxyService implements OnModuleInit {
  private readonly logger = new Logger('ShieldFlowProxy');

  constructor(private readonly domainBlockService: DomainBlockService) {}

  onModuleInit() {
    this.startHttpProxyServer();
  }

  private startHttpProxyServer() {
    const server = http.createServer((clientReq, clientRes) => {
      clientReq.on('error', (err) => {
        this.logger.warn(`Client request error: ${err.message}`);
      });

      const { method, url: reqUrl, headers } = clientReq;

      // For standard HTTP requests: full URL may come in `reqUrl`
      // Example: GET http://example.com/path HTTP/1.1
      const parsed = url.parse(reqUrl || '');
      const targetHost = parsed.hostname || headers.host?.split(':')[0] || '';

      if (this.domainBlockService.isBlocked(targetHost)) {
        this.logger.verbose(`ShieldFlow Proxy: Blocked HTTP request to: ${targetHost}`);
        clientRes.writeHead(403, { 'Content-Type': 'text/plain' });
        clientRes.end('Unable to access block by ShieldFlow Proxy.');
        return;
      }

      const protocol = parsed.protocol === 'https:' ? https : http;

      const requestOptions: http.RequestOptions = {
        method,
        headers,
        hostname: parsed.hostname,
        port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
        path: parsed.path,
      };

      const proxyReq = protocol.request(requestOptions, (proxyRes) => {
        clientRes.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
        proxyRes.pipe(clientRes, { end: true });
      });

      proxyReq.on('error', (err) => {
        this.logger.error(`HTTP proxy error: ${err.message}`);
        if (!clientRes.headersSent) {
          clientRes.writeHead(502, { 'Content-Type': 'text/plain' });
        }
        clientRes.end('Bad gateway (proxy error).');
      });

      clientReq.pipe(proxyReq, { end: true });
    });

    // Handle HTTPS CONNECT method (tunneling)
    server.on('connect', (req, clientSocket, head) => {
      let serverSocket: net.Socket | null = null;

      // Catch errors on clientSocket immediately so an aborted client connection never crashes Node.js
      clientSocket.on('error', (err) => {
        this.logger.warn(`Client socket error: ${err.message}`);
        serverSocket?.destroy();
      });

      clientSocket.on('close', () => {
        serverSocket?.destroy();
      });

      // req.url is "hostname:port" for CONNECT
      const [host, port] = (req.url || '').split(':');
      console.log("==============",host,port,"=====================")
      const targetHost = host || '';
      // Check if Domain is blocked Stop its access:
      if (this.domainBlockService.isBlocked(targetHost)) {
        this.logger.warn(`Blocked HTTPS CONNECT to: ${targetHost}`);
        const blockMessage = 'Unable to access block by ShieldFlow Proxy.';
        clientSocket.write(
          'HTTP/1.1 403 Forbidden\r\n' +
          'Content-Type: text/plain\r\n' +
          `Content-Length: ${Buffer.byteLength(blockMessage)}\r\n` +
          'Connection: close\r\n\r\n' +
          blockMessage,
          () => {
            clientSocket.destroy();
          },
        );
        return;
      }

      const targetPort = parseInt(port || '443', 10);
         
      serverSocket = net.connect(targetPort, targetHost, () => {
        // Tell client the tunnel is established
        clientSocket.write(
          'HTTP/1.1 200 Connection Established\r\n' +
          'Proxy-agent: ShieldFlow-Proxy\r\n' +
          '\r\n',
        );

        // Pipe data both ways
        if (head && head.length > 0) {
          serverSocket?.write(head);
        }
        if (serverSocket) {
          serverSocket.pipe(clientSocket);
          clientSocket.pipe(serverSocket);
        }
      });

      serverSocket.on('error', (err) => {
        this.logger.warn(`HTTPS tunnel error (${targetHost}): ${err.message}`);
        clientSocket.destroy();
      });

      serverSocket.on('close', () => {
        clientSocket.destroy();
      });
    });

    server.on('clientError', (err, socket) => {
      this.logger.error(`Client error: ${err.message}`);
      socket.destroy();
    });

    server.listen(PROXY_PORT, () => {
      this.logger.log(`ShieldFlow Proxy listening on port ${PROXY_PORT}`);
    });
  }
}