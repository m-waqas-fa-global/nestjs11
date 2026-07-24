import { Controller ,Post} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiResponse } from '../common/helpers/api-response.helper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(){
    return ApiResponse.success("User login")
  }

  @Post("sign_up")
  sign_up(){
    return ApiResponse.success("User sign_up")
  }

}