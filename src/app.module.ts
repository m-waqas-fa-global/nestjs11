import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { RouterModule } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino/LoggerModule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationEngineModule } from './notification_engine/notification_engine.module';
import { FileServerModule } from './file-server/file-server.module';
import { BookStoreModule } from './book_store/book_store.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MonitoringModule } from './monitoring/monitoring.module';
import { AuthModule } from './auth/auth.module';

const dbConfig:TypeOrmModuleOptions | undefined = {
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  autoLoadEntities: true,
}

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    // Tell nestjs which one file is loading in the project [npm i @nestjs/config] by giving the env file name:
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.example"
    }),
    // RouterModule.register([
    //   {
    //     path: "api",
    //     children: [
    //       {
    //         path: "files",
    //         module: FileServerModule
    //       }
    //     ]
    //   }
    // ]),

    // FileServerModule,
    // NotificationEngineModule,
    BookStoreModule,
    // =========================  Configure In Memory Database sqlite ==========================
    MonitoringModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(readonly configService: ConfigService) { }
}

