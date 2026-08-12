import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBook, UpdateBook } from '../interfaces/books.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksEntity} from '../entities/books.entity';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { ApiResponse } from '../../common/helpers/api-response.helper';
import { AuthorEntity } from '../entities/authors.entity';
import { PublishersEntity } from '../entities/publishers.entity';
import { WishlistEntity } from '../../modules/wish-list/entities/wishlists.entity';

@Injectable()
export class BookStoreService {

  constructor(
    @InjectRepository(BooksEntity) 
    private readonly bookStoreRepo: Repository<BooksEntity>,

    @InjectRepository(AuthorEntity) 
    private readonly autherRepo: Repository<AuthorEntity>,

    @InjectRepository(PublishersEntity) 
    private readonly publisherRepo: Repository<PublishersEntity>,

    @InjectRepository(WishlistEntity)
    private readonly wishlistRepo: Repository<WishlistEntity>,

    private dataSource:DataSource
  ) {}

  async hardDeleteMultiple(): Promise<void> {
    // Executes: DELETE FROM user WHERE id IN (1, 2, 3...)
    const ids = [14,15,16,17,18,19,20,21,22]
    await this.bookStoreRepo.delete(ids);
  }

  async ExecuteRawQuery(){
    const qr = "SELECT * FROM book_store WHERE bk_id = 3"
    const res =  await this.dataSource.query(qr)
     if (res) {
      return ApiResponse.success("Book Fetched Successfully", res)
    } else {
      return ApiResponse.error("No Book Found", 404)
    }
  }

  // ====================== Create New Book in DB =====================
  async create(createBookBody: CreateBook) {
    try {
      const book = this.bookStoreRepo.create(createBookBody);
      await this.bookStoreRepo.save(book);
      return {
        success: true,
        message: "Book Added Successfully",
        res: book
      };
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(
        "Server Error! Unable to create book"
      );
    }
  }
  // ====================== Get all books from DB =====================
  async findAll(Query: FindManyOptions<BooksEntity> | undefined) {
    
    const data = await this.bookStoreRepo.find();
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
  async findOne(book_id: number,user_id:number) {
    const book = await this.bookStoreRepo.findOneBy({ bk_id: book_id });
 
    const author = await this.autherRepo.findOneBy({author_id:book?.author_id})
    const publisher = await this.publisherRepo.findOneBy({publisher_id:book?.publisher_id})
    const is_wishlist = await this.isWishlisted(user_id,book_id)

    const response = {
      ...book,
      is_wishlist:is_wishlist,
      author,
      publisher
    }

    if (book) {
      return ApiResponse.success("Book Fetched Successfully", response)
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

  async getAutherPublisher(){
    const author = await this.autherRepo.find();
    const pub = await this.publisherRepo.find();
    const res = {
      author,
      pub
     }
    return ApiResponse.success("Publisher and Author List Fetched",res)
  }

  // Check whether a book is wishlisted
  async isWishlisted(user_id:number,book_id:number):Promise<boolean>{
    const listed =  await this.wishlistRepo.findOne({
       where:{
        user_id : user_id,
        book_id : book_id
       }
     }) 
    return !!listed
  }

}