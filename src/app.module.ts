import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino/LoggerModule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DevtoolsModule } from '@nestjs/devtools-integration';

import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './common/guards/custom-throttler.guard'
import { WishListModule } from './modules/wish-list/wish-list.module';
import { ApiLoggerInterceptor } from './common/interceptors/api-logger.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { ReportsModule } from './modules/reports/reports.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentModule } from './modules/payment/payment.module';
import { BookReviewsModule } from './modules/reviews/book-reviews.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookStoreModule } from './modules/books/book_store.module';
import { MonitoringModule } from './modules/monitoring/monitoring.module';
import { NotificationEngineModule } from './modules/notifications/notification.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DbStatsService } from './common/services/DbStats.service';

const dbConfig: TypeOrmModuleOptions | undefined = {
  type: 'sqlite',
  database: 'database.sqlite',  //,  ':memory:'
  synchronize: true,
  autoLoadEntities: true,
}


const CacheConfig = {
  isGlobal: true, // Makes the cache instance available everywhere without re-importing
  useFactory: async () => ({
    store: await redisStore({
      socket: {
        host: 'localhost',
        port: 6379,
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
      limit: 10,  // 10 requests per minute
    }
]

const ServeStatic = {
  rootPath: join(process.cwd(), 'storage'),
  serveRoot: '/storage',
}

@Module({
  imports: [
    // =========================  Configure In Memory Database sqlite ==========================
    TypeOrmModule.forRoot(dbConfig),    // Database Connection Module:
    ThrottlerModule.forRoot(ThrottleConfig), //Configure Rate Limiting:
    // CacheModule.registerAsync(CacheConfig), // Cache Server Connection Module:

    // Tell nestjs which one file is loading in the project [npm i @nestjs/config] by giving the env file name:
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.example"
    }),

    ServeStaticModule.forRoot(ServeStatic),

    RouterModule.register([
      {
        path: "api",
        children: [
          {
            path: "auth",
            module: AuthModule
          },
          {
            path: "books",
            module:BookStoreModule
          },
          {
            path: "dashboard",
            module:DashboardModule
          },
        ]
      }
    ]),

    NotificationEngineModule,
    // MonitoringModule,
    // ReportsModule,

    // WishListModule,
    // BookReviewsModule,
    // 
    BookStoreModule,
    AuthModule,
    OrdersModule,
    PaymentModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiLoggerInterceptor,
    },
    DbStatsService
  ],
})
export class AppModule implements OnModuleInit{
  constructor(readonly configService: ConfigService,private readonly dbStatsService:DbStatsService) { }

   // Added async keyword to safely block NestJS boot cycle until database tasks finish
  async onModuleInit(): Promise<void> {
    //  this.runRawQuery()
  }

  async runRawQuery(){
    try {
      await this.dbStatsService.backupAndDropTables('books', false);
      console.log('Database maintenance completed successfully during bootstrap.');
    } catch (error) {
      console.error('Database maintenance failed during lifecycle startup:', error);
    }
  }
}