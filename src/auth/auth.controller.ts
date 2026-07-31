import { Body, Controller ,Post} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiResponse } from '../common/helpers/api-response.helper';
import {LoginDTO} from './dto/login.dto'
import { SignUpDTO } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() body:LoginDTO){
    return ApiResponse.success("User login")
  }

  @Post("sign_up")
  sign_up(@Body() body:SignUpDTO){
    return this.authService.userSignUp(body)
  }

}