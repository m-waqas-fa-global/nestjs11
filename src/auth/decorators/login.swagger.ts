// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginApiBodyDto {
  @ApiProperty({ 
    description: 'The email address of the user', 
    example: 'john@example.com' 
  })
  email: string;

  @ApiProperty({ 
    description: 'user password', 
    example: 'jhon@123',
  })
  password: string;
}