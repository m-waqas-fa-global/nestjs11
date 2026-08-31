// src/modules/books/dto/create-book-swagger.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookSwagger {
  @ApiProperty({
    description: 'The title of the book',
    example: 'The Great Gatsby',
    type: String,
    required: true,
  })
  title: string;

  @ApiProperty({
    description: 'The subtitle of the book',
    example: 'A Classic American Novel',
    type: String,
    required: false,
    nullable: true,
  })
  subtitle: string;

  @ApiProperty({
    description: 'A brief description of the book',
    example: 'A story about wealth, love, and the American Dream.',
    type: String,
    required: false,
    nullable: true,
  })
  description: string;

  @ApiProperty({
    description: 'The cover photo of the book (upload file)',
    type: 'string',
    format: 'binary',
    required: false,
    nullable: true,
  })
  cover_photo: string | null;

  @ApiProperty({
    description: 'The price of the book',
    example: 3500,
    type: Number,
    required: true,
    minimum: 0,
  })
  price: number;

  @ApiProperty({
    description: 'The publication date of the book',
    example: '2024-01-15',
    type: String,
    format: 'date',
    required: false,
    nullable: true,
  })
  publication_date: Date;

  @ApiProperty({
    description: 'Total number of pages in the book',
    example: 350,
    type: Number,
    required: false,
    nullable: true,
    minimum: 1,
  })
  pages: number;

  @ApiProperty({
    description: 'The language in which the book is written',
    example: 'English',
    type: String,
    required: false,
    nullable: true,
  })
  language: string;

  @ApiProperty({
    description: 'ID of specific author who wrote this book',
    example: 3,
    type: Number,
    required: true,
    minimum: 1,
  })
  author_id: number;

  @ApiProperty({
    description: 'Publisher ID who published this book',
    example: 7,
    type: Number,
    required: true,
    minimum: 1,
  })
  publisher_id: number;
}