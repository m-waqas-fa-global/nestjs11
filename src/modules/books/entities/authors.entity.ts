import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('authors')
  export class AuthorEntity {
    
    @PrimaryGeneratedColumn()
    author_id: number;
  
    @Column({
      type: 'varchar',
      length: 100,
      unique: true,
    })
    name: string;
  
    @Column({ type: 'varchar', length: 500, nullable: true })
    bio: string;
  
    // @Column({
    //   type: 'varchar',
    //   length: 100,
    //   nullable: true,
    //   default: null,
    // })
    // nationality: string;
  
    // @Column({
    //   type: 'varchar',
    //   length: 255,
    //   nullable: true,
    //   default: null,
    // })
    // website: string;
  
    @CreateDateColumn()
    created_at: Date;
  }