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
      nullable: false,
    })
    name: string;
  
    @Column({
      type: 'text',
      nullable: true,
      default: null,
    })
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
  
    @CreateDateColumn({
      type: 'timestamp',
    })
    created_at: Date;
  }