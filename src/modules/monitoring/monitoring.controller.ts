import { Controller, Get, Render } from '@nestjs/common';
import { MonitoringService } from './services/monitoring.service';

@Controller('monitoring')
export class MonitoringController {
  constructor(
    private readonly monitoringService: MonitoringService,
  ) {}

    // GET /monitoring/health
    @Get('dashboard')
    @Render('health')
    getHealthDashboard() {
      const logs = this.monitoringService.getLogs();

      return {
        title: 'API Health Dashboard',
        logs,
        totalRequests: logs.length,
        successfulRequests: logs.filter(x => x.statusCode < 400).length,
        failedRequests: logs.filter(x => x.statusCode >= 400).length,
      };
    }
  
    // GET /monitoring/metrics
    @Get('metrics')
    getMetrics() {
      // Return performance data like CPU, memory, or response times
    }


}
