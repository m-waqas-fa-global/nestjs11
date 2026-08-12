import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistEntity } from '../entities/wishlists.entity';
import { In, Repository } from 'typeorm';
import { ApiResponse } from '../../../common/helpers/api-response.helper';
import { BooksEntity } from '../../../books/entities/books.entity';

@Injectable()
export class WishListService {

  constructor(
    @InjectRepository(WishlistEntity)
    private readonly wishlistRepo: Repository<WishlistEntity>,

    @InjectRepository(BooksEntity)
    private readonly bookStoreRepo: Repository<BooksEntity>,

  ) { }

  async addBooksToWishList(user_id: number, book_id: number) {
    const alreadyExist = await this.wishlistRepo.findOne({
      where: {
        user_id,
        book_id
      }
    })
    // Already exists → Remove
    if (alreadyExist?.book_id) {
      await this.wishlistRepo.remove(alreadyExist)
      return ApiResponse.success(
        "Book remove from wishlist"
      )
    }
    // Doesn't exist → Add
    const data = this.wishlistRepo.create({
      user_id,
      book_id
    })
    const saved = await this.wishlistRepo.save(data);
    // Return Data is saved successfully:
    if (saved?.wishlist_id) {
      return ApiResponse.success("Book added in wishlist")
    }
    // If Entity unable to save in DB
    return ApiResponse.success("Book added in wishlist")
  }

  async getAllWishListItem(user_id: number) {
    const wishListItems = await this.wishlistRepo.find({
      select: {
        user_id: true,
        book_id: true,
      },
      where: {
        user_id,
      },
    });
    const bookIds = wishListItems.map(item => item.book_id);     // Extract Books Id's and then get its 
    const wishListedBooks = await this.findBooksByIds(bookIds);
    const res = {
      user_id,
      books: wishListedBooks,
    };

    return ApiResponse.success(
      "List of all wishlist items",
      res,
    );
  }

  async findBooksByIds(ids: number[]) {
    return await this.bookStoreRepo.find({
      select: {
        bk_id: true,
        title: true,
        subtitle: true,
        cover_photo: true,
        price: true,
      },
      where: {
        bk_id: In(ids),
      },
    });
  }
}
