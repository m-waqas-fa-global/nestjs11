import { Module } from '@nestjs/common';
import { BookStoreController } from './book_store.controller';
import { BookStoreService } from './services/book_store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksEntity } from './entities/books.entity';
import { PdfService } from './services/pdf.service';
import { AuthorEntity } from './entities/authors.entity';
import { PublishersEntity } from './entities/publishers.entity';
import { WishlistEntity } from '../modules/wish-list/entities/wishlists.entity';
import { BookReviewEntity } from '../modules/book-reviews/entities/book_reviews.entity';

const Entities = [
  BooksEntity,
  AuthorEntity,
  PublishersEntity,
  WishlistEntity,      // WishList Table Entity
  BookReviewEntity     // Books Review Table Entity
]
 
@Module({
  imports: [
    TypeOrmModule.forFeature(Entities),
  ],
  controllers: [BookStoreController],
  providers: [
    BookStoreService,
    PdfService,
  ],
})
export class BookStoreModule {}