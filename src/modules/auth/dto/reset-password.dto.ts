// src/auth/dto/forgot-password-request.dto.ts
import { IsEmail, IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email address of the user requesting password reset',
    example: 'user@example.com',
    maxLength: 40,
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(40, { message: 'Email must not exceed 40 characters' })
  email: string;
}

export class VerifyOTPDTO {
  @ApiProperty({
    description: 'Email address of the user requesting password reset',
    example: 'user@example.com',
    maxLength: 40,
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(40, { message: 'Email must not exceed 40 characters' })
  email: string;
   
  @ApiProperty({
    description: 'OTP for reset Password',
    example: '654321',
    maxLength: 6,
  })
  @IsString()
  @IsNotEmpty({ message: 'otp is required' })
  @MaxLength(6, { message: 'otp must not exceed 6 characters' })
  otp: string;
}

export class ResetPasswordDTO {
  @ApiProperty({
    description: 'token sends in request for reset pass',
    example: 'token@321',
  })
  @IsNotEmpty({ message: 'token is required' })
  @IsString({message:"must be string"})
  reset_token: string;
   
  @ApiProperty({
    description: 'New passowrd after verification',
    example: 'newPass@4321',
  })
  @IsString({ message: 'new_password is must be string' })
  @IsNotEmpty({ message: 'new_password is required' })
  new_password: string;
}