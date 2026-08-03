// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ 
    description: 'The unique username of the user', 
    example: 'john_doe' 
  })
  name: string;

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
