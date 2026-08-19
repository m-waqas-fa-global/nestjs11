import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class DashboardService {
  constructor(
   
  ){}

  userStats() {
    return "www"
  }
}
