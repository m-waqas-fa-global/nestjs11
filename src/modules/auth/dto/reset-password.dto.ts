// src/auth/dto/forgot-password-request.dto.ts
import { IsEmail, IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email address of the user requesting password reset',
    example: 'user@example.com',
    maxLength: 100,
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(100, { message: 'Email must not exceed 100 characters' })
  email: string;

  @ApiProperty({
    description: 'URL to redirect after password reset (frontend reset page)',
    example: 'https://yourapp.com/reset-password',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  resetUrl?: string;
}