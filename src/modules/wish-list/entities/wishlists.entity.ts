import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('wishlists')
  export class WishlistEntity {

     // ❤️ Wishlist Module/Table → User ↔ Book wishlist relationship

    @PrimaryGeneratedColumn()
    wishlist_id: number;
  
    @Column({
      type: 'int',
      nullable: false,
    })
    user_id: number;
  
    @Column({
      type: 'int',
      nullable: false,
    })
    book_id: number;
  
    @CreateDateColumn()
    created_at: Date;
  }