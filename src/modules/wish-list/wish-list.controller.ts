import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WishListService } from './services/wish-list.service';

@Controller('wish-list')
export class WishListController {
  constructor(private readonly wishListService:WishListService) {}

  @Get("list")
  getWishList(){
    return {msg:"Return all Wishlist Item of this User"}
  }

  @Post("add/:bookId")
  addlist(@Param('bookId') bookId: string){
    return {msg:"Add books to WishList",id:bookId}
  }

  @Delete("delete/:bookId")
  delete(@Param('bookId') bookId: string){
    return {msg:"Delete wishlist item by Book ID",id:bookId}
  }
}
