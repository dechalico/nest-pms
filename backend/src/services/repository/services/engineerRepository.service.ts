import { BaseRepositoryService } from './baseRepository.service';
import { Engineer } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class EngineerRepository extends BaseRepositoryService<Engineer> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'engineers', Engineer);
  }
}
