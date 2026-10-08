import { Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './services/proxy.service';
import { DomainBlockService } from './services/domain-block.service';

@Module({
  controllers:[ProxyController],
  providers: [ProxyService, DomainBlockService],
})
export class ProxyModule { }
