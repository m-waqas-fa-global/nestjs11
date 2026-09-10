import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { DbStatsService } from './common/services/DbStats.service';

// @ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly dbStatsService:DbStatsService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/db-stats')
  @Render("database-stats")
  async getDBStats() {
    const data = await this.dbStatsService.logCurrentStats();
    return data; 
  }
}
