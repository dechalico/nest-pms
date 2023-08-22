import { OmitType, PartialType } from '@nestjs/mapped-types';

export class AreaOfficeSchema {
  id: string;
  name: string;
  city: string;
  dateCreated: Date;
}

export class CreateAreaOffice extends OmitType(AreaOfficeSchema, [
  'id',
  'dateCreated',
]) {}

export class UpdateAreaOffice extends PartialType(
  OmitType(AreaOfficeSchema, ['id', 'dateCreated']),
) {
  id: string;
}
