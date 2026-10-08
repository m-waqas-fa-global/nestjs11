import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Configure folder for static assets (optional: for CSS, JS, images)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Set the folder where your template files will live
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Set EJS as the MVC view engine
  app.setViewEngine('ejs');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
