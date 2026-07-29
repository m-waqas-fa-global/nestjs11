import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MonitoringService {

  getLogs() {
    const filePath = path.join(process.cwd(), 'src', 'common', 'logs', 'api-log.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const resData =   JSON.parse(data);
    return resData.reverse();
  }

}
