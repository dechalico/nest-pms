import { BaseRepositoryService } from './baseRepository.service';
import { EquipmentBrand } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class EquipmentBrandRepository extends BaseRepositoryService<EquipmentBrand> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'equipment_brands');
  }
}
