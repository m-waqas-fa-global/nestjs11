// src/auth/dto/change-password.dto.ts
import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password of the user',
    example: 'currentPass@123',
    minLength: 5,
    maxLength: 30,
  })
  @IsString()
  @MinLength(5, { message: 'Current password must be at least 5 characters long' })
  @MaxLength(30, { message: 'Current password must not exceed 30 characters' })
  current_password: string;

  @ApiProperty({
    example: 'pass@321',
    minLength: 5,
    maxLength: 30,
  })
  @IsString()
  @MinLength(5, { message: 'New password must be at least 5 characters long' })
  @MaxLength(30, { message: 'New password must not exceed 30 characters' })
  new_password: string;

  @ApiProperty({
    description: 'Confirm new password (must match newPassword)',
    example: 'pass@321',
  })
  @IsString()
  @MinLength(5, { message: 'Confirm password must be at least 5 characters long' })
  @MaxLength(30, { message: 'Confirm password must not exceed 30 characters' })
  confirm_password: string;
}