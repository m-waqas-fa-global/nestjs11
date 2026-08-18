import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reports APIs')
@Controller('reports')
export class ReportsController {

  constructor(
    private readonly reportsService: ReportsService,
  ) {
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

}
