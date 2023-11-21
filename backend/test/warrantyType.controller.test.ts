import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { NestApplication } from '@nestjs/core';

describe('WarrantyTypeController', () => {
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
    it('/admin/warranty-type - must return 201 status code', async () => {
      return request(app.getHttpServer())
        .post('/admin/warranty-type')
        .set('Authorization', `Bearer ${bearerToken}`)
        .send({
          name: 'quarterly',
          algorithm: 'M|3|Y|1',
        })
        .expect(201);
    });
  });

  describe('create equipment brand', () => {
    it('/admin/warranty-type - must return 400 status code', async () => {
      return request(app.getHttpServer())
        .post('/admin/warranty-type')
        .set('Authorization', `Bearer ${bearerToken}`)
        .send({
          name: 'quarterly',
          algorithm: 'MMMMYYYY',
        })
        .expect(400);
    });
  });
});
