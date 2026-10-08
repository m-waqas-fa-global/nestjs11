import { Injectable } from '@nestjs/common';
import { BLOCKED_DOMAINS } from 'src/common/config/proxy.config';


@Injectable()
export class DomainBlockService {
  private readonly blockedDomains = new Set(BLOCKED_DOMAINS);

  isBlocked(hostname: string): boolean {
    if (!hostname) return false;
    const lowerHost = hostname.toLowerCase();

    // Exact match
    if (this.blockedDomains.has(lowerHost)) return true;

    // Subdomain match: *.instagram.com etc.
    for (const domain of this.blockedDomains) {
      if (lowerHost === domain) return true;
      if (lowerHost.endsWith('.' + domain)) return true;
    }

    return false;
  }
}