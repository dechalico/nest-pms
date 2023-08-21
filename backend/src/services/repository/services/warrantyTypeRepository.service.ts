import { BaseRepositoryService } from './baseRepository.service';
import { WarrantyType } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class WarrantyTypeRepository extends BaseRepositoryService<WarrantyType> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'warranty_types', WarrantyType);
  }
}
