import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // get config values
  const configService = app.get(ConfigService);
  const port = configService.get<string>('port');
  const cookieSecret = configService.get<string>('cookie.secret');

  app.use(cookieParser(cookieSecret));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
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

  await app.listen(port);
}
bootstrap();
