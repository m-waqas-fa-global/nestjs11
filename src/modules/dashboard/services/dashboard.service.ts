import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/services/auth.service';
import { OrdersService } from '../../orders/services/orders.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly authService: AuthService,
    private readonly orderService: OrdersService
  ) {}

  async userStats() {
    const res = await this.authService.getRegisteredUserStats();
    return res;
  }

  async ordersStats(){
    return await this.orderService.orderStatsReports()
  }
  
}
