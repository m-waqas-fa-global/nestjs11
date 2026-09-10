import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './services/dashboard.service';
import { AuthModule } from '../auth/auth.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports:[
    AuthModule,
    OrdersModule
  ],
  controllers: [
    DashboardController
  ],
  providers: [
    DashboardService,
  ],
})
export class DashboardModule {}
