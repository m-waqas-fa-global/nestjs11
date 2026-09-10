// eslint-disable-next-line unused-imports/no-unused-imports
import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './services/dashboard.service';

@Controller()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // Get All Registered Users Stats:
  @Get('stats/users')
  user_stats() {   
    return this.dashboardService.userStats();
  }
  // Get All Orders Stats in orders Table:
  @Get('stats/orders')
  order_stats() {   
    return this.dashboardService.ordersStats();
  }

}