import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity("book_store")
export class BookStore {
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
        nullable: true,
        default: null,
      })
    description: string;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: true,
        default: null,
      })
    cover_photo: string;

    @Column({ default: null, nullable: true, length: 50 })
    author: string;

    @Column({ default: null, nullable: true, length: 100 })
    author_bio: string;

    @Column({ default: null, nullable: true, type: "decimal", precision: 10, scale: 2 })
    price: number;

    @Column({ default: 1 })
    is_available: boolean;

    // ==============================
    // 🏢 Publisher / Publication
    // ==============================

    @Column({
        type: 'varchar',
        length: 150,
        nullable: true,
      })
    publisher: string;
    
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
