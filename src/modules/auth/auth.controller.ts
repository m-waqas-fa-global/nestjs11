import { Body, Controller, Post, Get, Param ,Req, UseGuards} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginDTO } from './dto/login.dto'
import { SignUpDTO } from './dto/sign-up.dto';
import { HashService } from './services/hashing.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './decorators/signup.swagger';
import { LoginApiBodyDto } from './decorators/login.swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger'
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto, ResetPasswordDTO, VerifyOTPDTO } from './dto/reset-password.dto';
import { ChangePasswordService } from './services/change-password.service';
import { ResetPasswordService } from './services/reset-password.service';

@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly changePassService: ChangePasswordService,
    private readonly resetPassService: ResetPasswordService,
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
  
  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  @Get("sign_up_list")
  getAll(@Req() req:any) {
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
  
  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  @Post("change-password")
  chnagePassword(@Body() body:ChangePasswordDto, @Req() req:any){
    const userId = req.user.user_id;
    return this.changePassService.changePassword( 
      userId,
      body
    )
  }
// ===========================================================================================================
  // =========================== Reset Password End Ponits ===============================
// ===========================================================================================================

  @Post("forgot-password")
  forgotPassword(@Body() body:ForgotPasswordDto){ 
    return this.resetPassService.forgotPassword(
      body.email
    )
  }

  @Post("verify-reset-otp")
  verifyPassword(@Body() body:VerifyOTPDTO){
    return this.resetPassService.verifyOTP(
      body.email,
      body.otp
    )
  }

  @Post("reset-password")
  resetPassword(@Body() body:ResetPasswordDTO){
    return this.resetPassService.resetPassword(
      body.new_password,
      body.reset_token
    )
  }

}