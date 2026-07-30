import { Controller } from '@nestjs/common';
import { BookReviewsService } from './services/book-reviews.service';

@Controller('book-reviews')
export class BookReviewsController {
  constructor(private readonly bookReviewsService: BookReviewsService) {}
}
