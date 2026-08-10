import { ApiProperty } from '@nestjs/swagger';

export class CreateBookSwagger {
  @ApiProperty({
    description: 'The title of the book',
    example: 'The Great Gatsby',
  })
  title: string;

  @ApiProperty({
    description: 'The subtitle of the book',
    example: 'A Classic American Novel',
  })
  subtitle: string;

  @ApiProperty({
    description: 'A brief description of the book',
    example: 'A story about wealth, love, and the American Dream.',
  })
  description: string;

  @ApiProperty({
    description: 'The cover photo of the book',
    example: 'storage/uploads/cover.webp',
    nullable: true,
  })
  cover_photo: string | null;

  @ApiProperty({
    description: 'The price of the book',
    example: 29.99,
    type: Number,
  })
  price: number;

  @ApiProperty({
    description: 'The publication date of the book',
    example: '2024-01-15',
    type: String,
    format: 'date',
  })
  publication_date: Date;

  @ApiProperty({
    description: 'Total number of pages in the book',
    example: 350,
    type: Number,
  })
  pages: number;

  @ApiProperty({
    description: 'The language in which the book is written',
    example: 'English',
  })
  language: string;
}