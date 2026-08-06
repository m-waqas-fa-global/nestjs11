import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import session from 'express-session';
import { ApiLoggerInterceptor } from './common/interceptors/api-logger.interceptor';
import * as path from 'path';

function SwaggerConfig(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('NestJS Notify Service API')
    .setDescription(
      'This Notify Service API allows you to send emails and SMS messages using the NestJS framework.',
    ).setVersion('4.0')
    .addTag('API Endpoints')
    .addBearerAuth() // 👈 Enables Bearer Auth in Swagger UI
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs-swagger', app, document);
}

function ViewEngineConfig(app: NestExpressApplication): void {
  // Set Views Directory
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  // Set EJS as View Engine
  app.setViewEngine('ejs');
}

function CORSConfig(app: INestApplication) {
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    maxAge: 3600,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    exposedHeaders: ['Content-Range', 'X-Total-Count'],
  });
}

function globalBodyValidation(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      json: false,
      prefix: "NestJS Logs",
      timestamp: false
    }),
    // Enable Nest.js DEV Tools:
    // snapshot: true
  });

  // Req Body Validation or DTO's is not work if you don't add this line
  globalBodyValidation(app)
  // Cinfigure  Swagger API Docs UI:
  SwaggerConfig(app);
  // Configure EJS Template Engine:
  ViewEngineConfig(app);
  // Configure CORS:
  CORSConfig(app);

  //============= Create session Middleware for Nest.js Server ==============
  app.use(
    session({
      secret: 'MySecretWAQAS@3487',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
      },
    }),
  );
  // app.useGlobalInterceptors(new ApiLoggerInterceptor());

  app.enableVersioning({
    type: VersioningType.URI
  })

  await app.listen(process.env.PORT ?? 2000, () => {
    console.log(`Server is running on localhost:${process.env.PORT}`);
  });
}
bootstrap();
