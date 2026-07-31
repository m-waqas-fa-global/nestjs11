import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { APP_GUARD, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino/LoggerModule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationEngineModule } from './notification_engine/notification_engine.module';
import { FileServerModule } from './file-server/file-server.module';
import { BookStoreModule } from './book_store/book_store.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MonitoringModule } from './monitoring/monitoring.module';
import { AuthModule } from './auth/auth.module';

import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './common/guards/custom-throttler.guard'
import { WishListModule } from './modules/wish-list/wish-list.module';
import { BookReviewsModule } from './modules/book-reviews/book-reviews.module';
import { ApiLoggerInterceptor } from './common/interceptors/api-logger.interceptor';

const dbConfig:TypeOrmModuleOptions | undefined = {
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  autoLoadEntities: true,
}
const CacheConfig ={
  isGlobal: true, // Makes the cache instance available everywhere without re-importing
  useFactory: async () => ({
    store: await redisStore({
      socket: {
        host: 'localhost',
        port:  6379,
      },
      password: process.env.REDIS_PASSWORD || undefined,
      ttl: 60 * 15000, // Default Time-To-Live: 60 seconds (in milliseconds)
    }),
  }),
}
const ThrottleConfig = 
[
  {
    name: 'default',
    ttl: 60000, // 1 minute
    limit: 15,  // 10 requests per minute
  }
]

// [
//   {
//     name: 'short',
//     ttl: 1000,
//     limit: 3,
//   },
// ]

@Module({
  imports: [
  // Database Connection Module:
  TypeOrmModule.forRoot(dbConfig),
  // Configure Rate Limiting:
  ThrottlerModule.forRoot(ThrottleConfig)  ,
  // Cache Server Connection Module:
  // CacheModule.registerAsync(CacheConfig),

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
    // BookStoreModule,
    // =========================  Configure In Memory Database sqlite ==========================
    MonitoringModule,
    // WishListModule,
    // BookReviewsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide:APP_GUARD,
      useClass:CustomThrottlerGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiLoggerInterceptor,
    }
  ],
})
export class AppModule {
  constructor(readonly configService: ConfigService) { }
}