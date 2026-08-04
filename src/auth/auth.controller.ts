import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiResponse } from '../common/helpers/api-response.helper';
import { LoginDTO } from './dto/login.dto'
import { SignUpDTO } from './dto/sign-up.dto';
import { HashService } from './services/hashing.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './decorators/signup.swagger';
import { LoginApiBodyDto } from './decorators/login.swagger';


@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly hashPasswordService: HashService
  ) { }

  @Post("login")
  @ApiBody({ type: LoginApiBodyDto })
  login(@Body() body: LoginDTO) {
    return this.authService.loginUser(body)
  }

  @Post("sign_up")
  @ApiBody({ type: CreateUserDto })
  sign_up(@Body() body: SignUpDTO) {
    return this.authService.createUser(body)
  }

  @Get("sign_up_list")
  getAll() {
    return this.authService.getAllSignUsers()
  }

  @Get("lock_user/:id")
  activeUser(@Param('id') user_id: string) {
    return this.authService.changeUserStatus(Number(user_id))
  }

  @Get("get_roles_permissions")
  get_roles_permissions() {
    const query = {
      select: {
        created_at: false
      }
    }
    return this.authService.get_roles_permissions(query)
  }

}