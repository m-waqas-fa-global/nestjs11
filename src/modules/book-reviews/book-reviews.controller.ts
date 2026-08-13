import { Body, Controller,Get,Post, Req, Res, UseGuards } from '@nestjs/common';
import { BookReviewsService } from './services/book-reviews.service';
import { CreateBookReviewDto } from './dto/review';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateReviewSwagger } from './swagger/create.swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('reviews')
export class BookReviewsController {
  constructor(private readonly bookReviewsService: BookReviewsService) {}

  @UseGuards(JwtAuthGuard)    // this is protected API End Point
  @ApiBearerAuth()
  @ApiBody({type:CreateReviewSwagger})
  @Post("create")
  async createReview(
    @Body() body:CreateBookReviewDto,
    @Req() req:any
  ){
    const user_id = req.user.user_id ?? null;
    // return {data:user_id , ... body}
    return this.bookReviewsService.createReviews(user_id,body)
  }

  @Get("get_review_list")
  getAll(){
    return this.bookReviewsService.getReviewList()
  }

  @Get("allow_reviews")
  allowReviews(){
    return {msg:"End Point In Progress! Used for enabling product reviews"}
  }

}
