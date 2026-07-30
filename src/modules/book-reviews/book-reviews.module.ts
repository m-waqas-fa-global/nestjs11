import { Module } from '@nestjs/common';
import { BookReviewsController } from './book-reviews.controller';
import { BookReviewsService } from './services/book-reviews.service';

@Module({
  controllers: [BookReviewsController],
  providers: [BookReviewsService],
})
export class BookReviewsModule {}
