import { Module } from '@nestjs/common';
import { WishListController } from './wish-list.controller';
import { WishListService } from './services/wish-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistEntity } from './entities/wishlists.entity';

@Module({
  imports:[TypeOrmModule.forFeature([WishlistEntity])],
  controllers: [WishListController],
  providers: [WishListService],
})
export class WishListModule {}
