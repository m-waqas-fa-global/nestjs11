import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameTable implements MigrationInterface {
  name = 'RenameTable';

  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('🚀 Starting migration: Rename book_store → books');

    await queryRunner.renameTable('book_store', 'books');

    console.log('✅ Migration completed: book_store → books');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('🔄 Reverting migration: Rename books → book_store');

    await queryRunner.renameTable('books', 'book_store');

    console.log('✅ Migration reverted: books → book_store');
  }
}