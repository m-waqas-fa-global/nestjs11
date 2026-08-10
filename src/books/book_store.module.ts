import { Module } from '@nestjs/common';
import { BookStoreController } from './book_store.controller';
import { BookStoreService } from './services/book_store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookStore } from './entities/books.entity';
import { PdfService } from './services/pdf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookStore])
  ],
  controllers: [BookStoreController],
  providers: [BookStoreService,PdfService],
})
export class BookStoreModule { }
