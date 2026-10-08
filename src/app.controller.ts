import { Controller, Get, Header, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('home-page')
  getRoot() {
    return this.appService.getHomeData();
  }

  @Get('api/blocked-domains')
  getBlockedDomains() {
    return {
      success: true,
      port: this.appService.getProxyPort(),
      total: this.appService.getBlockedDomains().length,
      domains: this.appService.getBlockedDomains(),
    };
  }
}
