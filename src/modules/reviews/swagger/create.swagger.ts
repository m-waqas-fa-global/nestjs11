import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewSwagger{

  @ApiProperty({
    description: 'ID of the book being reviewed',
    example: 101,
    type: Number,
  })
  @IsInt()
  book_id: number;


  @ApiProperty({
    description: 'Rating given to the book',
    example: 4,
    minimum: 1,
    maximum: 5,
    type: Number,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;


  @ApiPropertyOptional({
    description: 'Review text written by the user',
    example: 'Excellent book. Highly recommended!',
    type: String,
  })
  @IsOptional()
  @IsString()
  review_text?: string;
}