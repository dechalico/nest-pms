import { BaseRepositoryService } from './baseRepository.service';
import { User } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class UserRepository extends BaseRepositoryService<User> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'users');
  }
}
