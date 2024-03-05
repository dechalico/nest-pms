import { PartialType, PickType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';

export class WarrantyTypeSchema {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  algorithm: string;

  @Expose()
  algoMessage: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;
}

export class CreateWarrantyType extends PickType(WarrantyTypeSchema, ['name', 'algorithm']) {}

export class UpdateWarrantyType extends PartialType(CreateWarrantyType) {
  id: string;
}
