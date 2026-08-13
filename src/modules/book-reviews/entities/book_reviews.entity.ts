import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from 'typeorm';
  
  @Entity('book_reviews')
  export class BookReviewEntity {

    // ⭐ Reviews Module/Table → User reviews and ratings for books

    @PrimaryGeneratedColumn()
    review_id: number;
  
    @Column({
      type: 'int',
      nullable: false,
    })
    book_id: number;
  
    @Column({
      type: 'int',
      nullable: false,
    })
    user_id: number;
  
    @Column({
      type: 'decimal',
      precision: 2,
      scale: 1,
      nullable: false,
    })
    rating: number;
  
    @Column({
      type: 'text',
      nullable: true,
      default: null,
    })
    review_text: string;
  
    @Column({
      type: 'boolean',
      default: true,
    })
    is_approved: boolean;

    @CreateDateColumn()
    created_at: Date;
  }