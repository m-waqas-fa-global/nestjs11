import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { DataSource } from 'typeorm';

@Injectable()
export class DbStatsService {

  constructor(private readonly dataSource: DataSource) {}

  async getMetrics() {
    // 1. Calculate allocated in-memory size via system page allocation
    const sizeQuery = await this.dataSource.query(
      `SELECT page_count * page_size AS size_bytes FROM pragma_page_count(), pragma_page_size();`
    );
    const databaseSizeBytes = sizeQuery[0]?.size_bytes || 0;

    // 2. Fetch all user tables (filtering out internal sqlite system schemas)
    const tablesQuery = await this.dataSource.query(
      `SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%';`
    );
    const tableNames = tablesQuery.map((row: { name: string }) => row.name);

    // 3. Loop through individual tables to fetch active data row counts
    const tableStats:any = [];
    for (const tableName of tableNames) {
      const countQuery = await this.dataSource.query(`SELECT COUNT(*) AS total_rows FROM "${tableName}";`);
      tableStats.push({
        table: tableName,
        rows: countQuery[0]?.total_rows || 0,
      });
    }

    return {
      databaseSize: `${(databaseSizeBytes / 1024).toFixed(2)} KB`,
      totalTablesCount: tableNames.length,
      tablesDetails: tableStats,
    };
  }

  //  Get All DB Statics
  async logCurrentStats() {
    const stats = await this.getMetrics();
    // console.log('--- SYSTEM DATABASE PERFORMANCE SNAPSHOT ---');
    // console.log(`Allocated RAM Target Size: ${stats.databaseSize}`);
    // console.log(`Total Number of Tables in SQLITE DB: ${stats.totalTablesCount}`);
    // console.log(`Active Table Records: ${JSON.stringify(stats.tablesDetails)}`);
    // console.log('---------------------------------------------');]
    return stats;
  }

  async backupAndDropTables(tableName:string,tableBackUp:boolean = true): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    // Start a transaction to ensure database structural integrity
    await queryRunner.startTransaction();
    try {
      if (tableBackUp === true) {
            // 1. Fetch all raw data from the book_store table for backing up
          const bookStoreRows = await queryRunner.query(`SELECT * FROM ${tableName}`);
          // 2. Define the path to your designated backups folder
          const backupDirectory = join(process.cwd(), 'src', 'database', 'backups');

          // Ensure the directory exists recursively so node doesn't throw an 'ENOENT' error
          if (!fs.existsSync(backupDirectory)) {
            fs.mkdirSync(backupDirectory, { recursive: true });
          }

          // 3. Define the full, absolute file path targeting a JSON extension (.json)
          const fullFilePath = join(backupDirectory, `${tableName}_backup_${Date.now()}.json`);

          // 4. Serialize raw rows to a formatted, human-readable JSON string (2-space indentation)
          const jsonData = JSON.stringify(bookStoreRows, null, 2);

          // 5. Write JSON file safely to your specified local storage path using native filesystem
          fs.writeFileSync(fullFilePath, jsonData, 'utf8');
      }
      // 6. Drop the table now that data persistence is securely verified
      await queryRunner.query(`DROP TABLE IF EXISTS ${tableName};`);

      // Commit transaction updates globally 
      await queryRunner.commitTransaction();
    } catch (error:any) {
      // Rollback structural database changes instantly if any query or file write fails
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(`Database cleanup pipeline failed: ${error?.message}`);
    } finally {
      // Release connection pipeline allocation back to TypeORM pool
      await queryRunner.release();
    }
  }


}