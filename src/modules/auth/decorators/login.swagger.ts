// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginApiBodyDto {
  @ApiProperty({ 
    description: 'The email address of the user', 
    example: 'waqas@example.com' 
  })
  email: string;

  @ApiProperty({ 
    description: 'user password', 
    example: 'waqas@123',
  })
  password: string;
}