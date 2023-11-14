import { PartialType, PickType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';

export class EquipmentBrandSchema {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;
}

export class CreateEquipmentBrand extends PickType(EquipmentBrandSchema, ['name']) {}

export class UpdateEquipmentBrand extends PartialType(CreateEquipmentBrand) {
  @Expose()
  id: string;
}
