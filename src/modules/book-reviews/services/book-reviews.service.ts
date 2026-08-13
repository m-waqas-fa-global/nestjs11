import { Injectable } from '@nestjs/common';
import { BookReviewEntity } from '../entities/book_reviews.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReview } from '../interface/review.interface';
import { ApiResetContentResponse } from '@nestjs/swagger';
import { ApiResponse } from '../../../common/helpers/api-response.helper';

@Injectable()
export class BookReviewsService {

    constructor(
        @InjectRepository(BookReviewEntity)
        private reviewsRepo:Repository<BookReviewEntity>
    ){}

    
    async createReviews(user_id:number | null ,body:createReview){
      
      if (!user_id) {
        return ApiResponse.error("User id not found")
      }
      
       const review = this.reviewsRepo.create({
         user_id:user_id,
         ...body
       })

      try {
        await this.reviewsRepo.save(review)
        return ApiResponse.success("Reivew added successfully")
      } catch (error) {
        console.log(error)
        return ApiResponse.error("Server Error! Failed to add review")
      }

    }

    async getReviewList(){
      return await this.reviewsRepo.find()
    }
 
}

