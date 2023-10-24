import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ClientController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
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

  describe('create client', () => {
    it('/admin/clients/', async () => {
      return request(app.getHttpServer())
        .post('/admin/clients')
        .set('Authorization', `Bearer ${bearerToken}`)
        .send({
          city: 'muntinlupa city',
          name: 'muntinlupa hospital',
        })
        .expect(201);
    });
  });

  describe('list client', () => {
    it('/admin/clients', async () => {
      return request(app.getHttpServer())
        .get('/admin/clients')
        .set('Authorization', `Bearer ${bearerToken}`)
        .expect(200);
    });
  });

  describe('will not accept payload data', () => {
    it('/admin/clients', async () => {
      return request(app.getHttpServer())
        .post('/admin/clients')
        .set('Authorization', `Bearer ${bearerToken}`)
        .send({
          name: 'muntinlupa hospital',
        })
        .expect(400);
    });
  });
});
