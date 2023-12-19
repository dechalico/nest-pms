import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // register cookie and set cookie secret
  const configService = app.get(ConfigService);
  app.use(cookieParser(configService.get('cookie').secret));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PMS Backend API')
    .setDescription('Saviour PMS monitoring backend services')
    .setVersion('1.0')
    .addTag('PMS')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
}
bootstrap();
