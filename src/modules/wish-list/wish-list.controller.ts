import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WishListService } from './services/wish-list.service';
import { WishListDTO } from './dto/wishlist.dto';

@Controller('wish-list')
export class WishListController {
  constructor(private readonly wishListService:WishListService) {}

  @Get("list")
  getWishList(){
    return {msg:"Return all Wishlist Item of this User"}
  }

  @Post("add")
  addlist(@Body() body:WishListDTO){
    return {msg:"Add books to WishList",body}
  }

  @Delete("delete/:bookId")
  delete(@Param('bookId') bookId: string){
    return {msg:"Delete wishlist item by Book ID",id:bookId}
  }
}
