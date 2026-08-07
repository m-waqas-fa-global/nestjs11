import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { createFakeUser } from './factory/report.factory';

@Injectable()
export class ReportsService {
  private reports = [
    {
      "status": false,
      "id": 11,
      "patientStatus": "MSE"
    },
    {
      "status": false,
      "id": 12,
      "patientStatus": "LWBS"
    },
    {
      "status": true,
      "id": 10,
      "patientStatus": "AMA"
    },
    {
      "status": true,
      "id": 9,
      "patientStatus": "OBS/Trans"
    },
    {
      "status": true,
      "id": 8,
      "patientStatus": "OBS/Disc"
    },
    {
      "status": true,
      "id": 7,
      "patientStatus": "Discharged"
    },
    {
      "status": false,
      "id": 4,
      "patientStatus": "Comped"
    },
    {
      "status": false,
      "id": 5,
      "patientStatus": "Observation"
    },
    {
      "status": true,
      "id": 6,
      "patientStatus": "Transfer"
    }];

  private users: any = [];
  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report';
  }

  findAll() {
    const res = {
      status: true,
      msg: "Data fetched successfully!",
      data: this.users
    }
    return res;
  }
  /**
  * @example
  * faker.finance.accountNumber() // '92842238'
  * faker.finance.accountNumber(5) // '32564'
  * @link
  * https://rovermd.atlassian.net/browse/ROV-3513
  * @see https://rovermd.atlassian.net/browse/ROV-3513
  * @argument id:number
  * 
  * 
  */
  findOne() {
    const res = {
      status: true,
      msg: "Single user details",
      data: createFakeUser()
    }
    this.users.push(createFakeUser());
    return res;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }

  getAPILogs() {
    const res = { msg: "logs", data: [] }
    return res;
  }

  searchByStatus(status: string) {
    const isCompleted = status.toLowerCase() === true.toString();
    return this.reports.filter(report => report.status === isCompleted);
  }
}
