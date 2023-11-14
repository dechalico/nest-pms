import { PickType } from '@nestjs/mapped-types';

class EquipmentBrand {
  name: string;
  dateUpdated: Date;
  dateCreated: Date;
}

export class CreateEquipmentBrandArgs extends PickType(EquipmentBrand, ['name']) {}

export class CreateEquipmentBrandResult extends EquipmentBrand {}
