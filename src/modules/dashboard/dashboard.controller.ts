// eslint-disable-next-line unused-imports/no-unused-imports
import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './services/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('get_user_stats')
  findAll() {
    return this.dashboardService.userStats();
  }

}
