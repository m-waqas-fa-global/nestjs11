import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBook, UpdateBook } from '../interfaces/books.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BookStore } from '../entities/book_store.entity';
import { DataSource, FindManyOptions, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { ApiResponse } from '../../common/helpers/api-response.helper';

@Injectable()
export class BookStoreService {

  constructor(
    @InjectRepository(BookStore) 
    private readonly bookStoreRepo: Repository<BookStore>,
    private dataSource:DataSource
    ) { }

  async ExecuteRawQuery(){
    const qr = "SELECT * FROM book_store WHERE bk_id = 3"
    let res =  await this.dataSource.query(qr)
     if (res) {
      return ApiResponse.success("Book Fetched Successfully", res)
    } else {
      return ApiResponse.error("No Book Found", 404)
    }
    
  }

  // ====================== Create New Book in DB =====================
  async create(createBookBody: CreateBook) {
    const book = this.bookStoreRepo.create(createBookBody);
    await this.bookStoreRepo.save(book);
    return {
      success: true,
      message: "Book Added Successfully",
      res: book
    };
  }
  // ====================== Get all books from DB =====================
  async findAll(Query: FindManyOptions<BookStore> | undefined) {
    
    const data = await this.bookStoreRepo.find(Query);
    if (data.length > 0) {
      return {
        success: true,
        message: "Books Fetched Successfully",
        res: data
      };
    }
    else {
      return {
        success: false,
        message: "No Books Found",
        res: []
      };
    }
  }
  // ====================== Get single book by ID from DB =====================
  async findOne(id: number) {
    const book = await this.bookStoreRepo.findOneBy({ bk_id: id });
    if (book) {
      return ApiResponse.success("Book Fetched Successfully", book)
    } else {
      return ApiResponse.error("No Book Found", 404)
    }
  }

  async update(id: number, updateBookStoreDto: UpdateBook) {
    return {
      message: "Unable to delete"
    }
  }

  async remove(id: number) {
    // return `This action removes a #${id} bookStore`;
    const deletedBook = await this.bookStoreRepo.softDelete(id)

    if (deletedBook.affected === 0) {
      throw new NotFoundException('Book not found');
    }

    return ApiResponse.success(`Book deleted successfully`)
  }

  async changeBookStatus(bk_id: number) {
    const book = await this.bookStoreRepo.findOneBy({ bk_id: bk_id })
    // check if book not found throw error:
    if (!book) {
      throw new NotFoundException(`${bk_id} Book is Not Found in Database`)
    }

    book.is_available = !book.is_available;    // chnage status and again save to Database
    const statsUpdated = await this.bookStoreRepo.save(book);
    if (!statsUpdated) {
      throw new InternalServerErrorException("Error occurred while updating book status")
    }

    return ApiResponse.status_message(`Book ${statsUpdated.is_available ? "Enabled" : "Disabled"} Successfully`, 200)
  }

  async checkTableStats() {
    const stats = {
      total_books: await this.bookStoreRepo.count(),
      avg_price: await this.bookStoreRepo.average('price'),
      total_price: await this.bookStoreRepo.sum('price'),
      min_price: await this.bookStoreRepo.minimum('price'),
      max_price: await this.bookStoreRepo.maximum('price')
    }

    return stats
  }

}