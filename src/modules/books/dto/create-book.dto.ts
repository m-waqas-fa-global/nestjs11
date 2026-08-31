// src/modules/books/dto/create-book-validation.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
  IsInt,
  Min,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookValidationDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsOptional()
  subtitle: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  cover_photo: string | null;

  @IsNumber({}, { message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price is required' })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsDateString({}, { message: 'Publication date must be a valid date (YYYY-MM-DD)' })
  publication_date: Date;

  @IsOptional()
  @IsInt({ message: 'Pages must be an integer' })
  @IsPositive({ message: 'Pages must be a positive number' })
  @Type(() => Number)
  pages: number;

  @IsString()
  @IsOptional()
  language: string;

  @IsNumber({}, { message: 'Author ID must be a number' })
  @IsNotEmpty({ message: 'Author ID is required' })
  @IsPositive({ message: 'Author ID must be a positive number' })
  @Type(() => Number)
  author_id: number;

  @IsNumber({}, { message: 'Publisher ID must be a number' })
  @IsNotEmpty({ message: 'Publisher ID is required' })
  @IsPositive({ message: 'Publisher ID must be a positive number' })
  @Type(() => Number)
  publisher_id: number;
}