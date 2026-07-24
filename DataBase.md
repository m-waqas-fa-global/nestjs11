## DBeaver Community | Free Open-Source Database ...
url  = `https://dbeaver.io`


## Use SQLite3 package for using In Memory/File Based Database in Nestjs

- sqlite3 is a fast, small, full-featured, serverless SQL database engine.  
- In-Memory Database: Use a filename of `:memory:` to create a database that lives in RAM.
- File-Based Database: Use a filename of your choice (e.g., "users.db") to create a database that is stored in a file.

## How to use In Memory/File Based Database in Nestjs

- Use SQLite3 package for using In Memory/File Based Database in Nestjs

## Configuration in `app.module.ts` 

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:', // In-memory database  || "database.sqlite" || "dev.sqlite"
      entities: [User],
      synchronize: true, // Auto-create tables (good for dev/testing)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

## Recommendation
- Use database: ':memory:' for learning, unit tests, and temporary data.
- Use database: 'database.sqlite' for development, so your data survives code changes and application restarts.
- For production, prefer a server-based database such as PostgreSQL or MySQL.