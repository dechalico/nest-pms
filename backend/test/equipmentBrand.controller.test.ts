import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { NestApplication } from '@nestjs/core';

describe('EquipmentBrandController', () => {
  let app: NestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  let bearerToken: string;
  describe('login account', () => {
    it('/auth/login (POST)', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'admin',
          password: 'admin',
        })
        .expect(201)
        .then((response) => {
          bearerToken = response.body.token;
        });
    });
  });

  describe('create equipment brand', () => {
    it('/admin/equipment-brands - must return 201 status code', async () => {
      return request(app.getHttpServer())
        .post('/admin/equipment-brands')
        .set('Authorization', `Bearer ${bearerToken}`)
        .send({
          name: 'Astra Zenica',
        })
        .expect(201);
    });

    it('/admin/equipment-brands - should return 400 status code', async () => {
      return request(app.getHttpServer())
        .post('/admin/equipment-brands')
        .set('Authorization', `Bearer ${bearerToken}`)
        .send({
          host: 'example',
        })
        .expect(400);
    });
  });
});
