import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn 
} from 'typeorm';

@Entity("book_store")   // book_store     // books
export class BooksEntity {
    
    // ========== Basic Books Details: ==============
    @PrimaryGeneratedColumn()
    bk_id: number;

    @Column({ default: null, nullable: true, length: 100 })
    title: string;

    @Column({
      type: 'varchar',
      length: 255,
      nullable: true,
      default:null
    })
    subtitle: string;

    @Column({
      type: 'text',
      length:500,
      nullable: true,
      default: null,
    })
    description: string;

    @Column({
      type: 'varchar',
      length: 150,
      nullable: true,
      default: null,
    })
    cover_photo: string | null;
    
    @Column({ default: null, nullable: true, type: "decimal", precision: 10, scale: 2 })
    price: number;

    // ========== Author Details: ==============
    @Column({ type:'int',default: null })
    author_id : number;

    @Column({ type:'int', default: null })
    publisher_id: number;

    @Column({ default: 1 })
    is_available: boolean;

    // ========== Publisher Details: ==============
    @Column({
      type: 'date',
      nullable: true,
    })
    publication_date: Date;
    
    @Column({
      type: 'int',
      nullable: true,
    })
    pages: number;
    
    @Column({
      type: 'varchar',
      length: 50,
      nullable: true,
      default:"English"
    })
    language: string;


    // =========== Soft Delete Column in Books Table: ===========
    // Standard soft delete column
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deleted_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
