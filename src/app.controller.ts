import { Controller, Get } from '@nestjs/common';
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

  @Get('get_db_stats')
  async getDBStats() {
    return await this.dbStatsService.logCurrentStats();
  }
}
