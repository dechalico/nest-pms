import { BaseRepositoryService } from './baseRepository.service';
import { Client } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class ClientRepository extends BaseRepositoryService<Client> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'clients');
  }
}
