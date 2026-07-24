import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity("book_store")
export class BookStore {
    @PrimaryGeneratedColumn()
    bk_id: number;

    @Column({ default: null, nullable: true, length: 100 })
    title: string;

    @Column({ default: null, nullable: true, length: 50 })
    author: string;

    @Column({ default: null, nullable: true, type: "decimal", precision: 10, scale: 2 })
    price: number;

    @Column({ default: 1 })
    is_available: boolean;

    // =========== Soft Delete Column in Books Table: ===========
    // Standard soft delete column
    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deleted_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
