// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The unique username of the user',
    example: 'waqas'
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'waqas@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'user password',
    example: 'jhon@123',
  })
  password: string;

  @ApiProperty({
    description: 'role id',
    example: '1',
  })
  role_id: number;

  @ApiProperty({
    description: 'Array of permission IDs',
    example: [1, 3],
    isArray: true,
    type: Number
  })
  permission_ids: number[];
}
