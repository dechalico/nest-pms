import { BaseRepositoryService } from './baseRepository.service';
import { AreaOffice } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AreaOfficeRepository extends BaseRepositoryService<AreaOffice> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'area_offices', AreaOffice);
  }
}
