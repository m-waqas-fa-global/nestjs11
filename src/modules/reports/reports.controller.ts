import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { PinoLogger } from 'nestjs-pino/PinoLogger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reports APIs')
@Controller()
export class ReportsController {

  constructor(
    private readonly reportsService: ReportsService,
    private readonly pinologger: PinoLogger
  ) {
    this.pinologger.setContext(ReportsController.name);
  }

  // @Post('create')
  // create(@Body() createReportDto: CreateReportDto) {
  //   return this.reportsService.create(createReportDto);
  // }

  @Get('getAll')
  findAll() {
    return this.reportsService.findAll();
  }

  // example route demonstrating query parameters
  // call with /reports/search?status=completed
  @Get('search')
  search(@Query('status') status: string) {
    // forward query value to service or handle directly
    if (status) {
      return this.reportsService.searchByStatus(status);
    }
    return {
      msg: "Provide the Valied Query Param"
    }
  }

  @Get('getOne')
  findOne() {
    return this.reportsService.findOne()
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
  //   return this.reportsService.update(+id, updateReportDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reportsService.remove(+id);
  // }

  @Get('getAPILogs')
  healthCheck() {
    //  return path.join(this.logsDir, __filename);
    return this.reportsService.getAPILogs();
  }


  @Get("getAllReports")
  getAll() {
    this.reportsService.getAPILogs
  }


}
