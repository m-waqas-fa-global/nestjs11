import { Module } from '@nestjs/common';
import { BookReviewsController } from './book-reviews.controller';
import { BookReviewsService } from './services/book-reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookReviewEntity } from './entities/book_reviews.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      BookReviewEntity
    ])
  ],
  controllers: [BookReviewsController],
  providers: [BookReviewsService],
})
export class BookReviewsModule {}
