import { Injectable } from '@nestjs/common';
import { BLOCKED_DOMAINS, PROXY_PORT } from './common/config/proxy.config';

@Injectable()
export class AppService {
  getBlockedDomains(): string[] {
    return BLOCKED_DOMAINS;
  }

  getProxyPort(): number {
    return PROXY_PORT;
  }

  getHomeData() {
    return {
      title: 'ShieldFlow Proxy | Control Surface',
      blockedDomains: BLOCKED_DOMAINS,
      totalBlocked: BLOCKED_DOMAINS.length,
      PROXY_PORT: PROXY_PORT,
      status: 'active',
    };
  }
}
