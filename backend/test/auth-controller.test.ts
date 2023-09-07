import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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

  let guid: string, token: string;
  describe('create user invite', () => {
    it('/admin/users/create-invite (POST)', async () => {
      return request(app.getHttpServer())
        .post('/admin/users/create-invite')
        .set('Authorization', `Bearer ${bearerToken}`)
        .send({
          areaOfficeId: '64eb8d2f03384540ef132063',
        })
        .expect(201)
        .then((response) => {
          guid = response.body.guid;
          token = response.body.token;
        });
    });
  });

  describe('validate token and guid', () => {
    it('/auth/validate-invite (GET)', async () => {
      return request(app.getHttpServer())
        .get(`/auth/validate-invite/?token=${token}&guid=${guid}`)
        .expect(200);
    });
  });

  describe('register user', () => {
    it('/auth/register (POST)', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          firstName: 'dexter',
          lastName: 'dexter',
          email: 'dexter@gmail.com',
          username: 'aloralor',
          password: '12312312312',
          guid,
          token,
        })
        .expect(201)
        .then((response) => {
          expect(response.body.username).toEqual('aloralor');
        });
    });
  });
});
