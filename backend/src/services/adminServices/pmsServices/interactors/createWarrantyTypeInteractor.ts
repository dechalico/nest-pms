import { OmitType } from '@nestjs/mapped-types';

class WarrantyType {
  name: string;
  algorithm: string;
  dateCreated: Date;
}

export class CreateWarrantyTypeArgs extends OmitType(WarrantyType, ['dateCreated']) {}

export class CreateWarrantyTypeResult extends WarrantyType {}
