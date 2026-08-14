import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateBookReviewDto {

  @IsInt()
  book_id: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  review_text?: string;
}