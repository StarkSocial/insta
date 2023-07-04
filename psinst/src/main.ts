import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  const uploadsPath = join(__dirname, '', 'uploads');
  console.log('Serving static files from:', uploadsPath);
  app.useStaticAssets(uploadsPath);
  await app.listen(3000);
}
bootstrap();