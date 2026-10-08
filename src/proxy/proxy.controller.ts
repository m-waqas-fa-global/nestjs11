import { Controller, Get } from '@nestjs/common';
import { ProxyService } from './services/proxy.service';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) { }

  @Get('health')
  health() {
    return {
      status: 'ok',
      name: 'ShieldFlow Proxy',
      version: '1.0.0',
    };
  }
}
