// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginApiBodyDto {
  @ApiProperty({ 
    description: 'The email address of the user', 
    example: 'rizwan@example.com' 
  })
  email: string;

  @ApiProperty({ 
    description: 'user password', 
    example: 'rizwan@123',
  })
  password: string;
}