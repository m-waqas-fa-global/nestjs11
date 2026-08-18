import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { WishListService } from './services/wish-list.service';
import { WishListDTO } from './dto/wishlist.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { WishlistSwagger } from './swagger/add.swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)    // this is protected API End Point
@ApiBearerAuth()
@Controller('wish-list')
export class WishListController {
  constructor(private readonly wishListService:WishListService) {}

  @Get("list")
  getWishList(@Req() req:any){
    return this.wishListService.getAllWishListItem(req?.user?.user_id)
  }

  @ApiBody({type:WishlistSwagger})
  @Post("add")
  addlist(@Req() req:any , @Body() body:WishListDTO){
    // return {msg:"Add books to WishList",body,token:req?.user ?? null}
    return this.wishListService.addBooksToWishList(
      req?.user?.user_id  ?? null,
      body.book_id
    )
  }
}
