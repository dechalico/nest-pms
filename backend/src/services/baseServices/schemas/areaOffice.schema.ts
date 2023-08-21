import { OmitType, PartialType } from '@nestjs/mapped-types';

export class AreaOfficeSchema {
  id: string;
  name: string;
  city: string;
}

export class CreateAreaOffice extends OmitType(AreaOfficeSchema, ['id']) {}

export class UpdateAreaOffice extends PartialType(AreaOfficeSchema) {
  id: string;
}
