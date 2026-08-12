import { ApiProperty } from '@nestjs/swagger';

export class WishlistSwagger {
  @ApiProperty({
    description: 'Book Id adding into wishlist',
    example: 26,
  })
  book_id: number;
}