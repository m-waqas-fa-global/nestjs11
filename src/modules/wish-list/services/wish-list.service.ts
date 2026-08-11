import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistEntity } from '../entities/wishlists.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishListService {

    constructor(
        @InjectRepository(WishlistEntity)
        private readonly wishlistRepo:Repository<WishlistEntity>
    ){}


    async addBooksToWishList(body:any){
        const data =  await this.wishlistRepo.create(body)
        this.wishlistRepo.save(data);

        return {
            success: true,
            message: "Book added in wishlist",
          };
    }

    getAllWishListItem(){

    }

    removeFromWishList(){

    }
}
