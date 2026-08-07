import { Body, Controller, Post, Get, Param ,Req, UseGuards} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiResponse } from '../common/helpers/api-response.helper';
import { LoginDTO } from './dto/login.dto'
import { SignUpDTO } from './dto/sign-up.dto';
import { HashService } from './services/hashing.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './decorators/signup.swagger';
import { LoginApiBodyDto } from './decorators/login.swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger'


@Controller()
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
    // return { res: body, msg: "Sign Iup" }
    return this.authService.createUser(body)
  }
  
  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  @Get("sign_up_list")
  getAll(@Req() req:any) {
    // return {...req.user,msg:"user provided token"}
    return this.authService.getAllSignUsers()
  }

  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  @Get("lock_user/:id")
  activeUser(@Param('id') user_id: string) {
    return this.authService.changeUserStatus(Number(user_id))
  }

  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  @Get("get_roles_permissions")
  get_roles_permissions() {
    return this.authService.get_roles_permissions_list()
  }

}