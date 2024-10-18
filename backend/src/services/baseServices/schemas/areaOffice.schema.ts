import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';

export class AreaOfficeSchema {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  city: string;

  @Expose()
  dateCreated: Date;
}

export class CreateAreaOffice extends OmitType(AreaOfficeSchema, ['id', 'dateCreated']) {}

export class UpdateAreaOffice extends PartialType(
  OmitType(AreaOfficeSchema, ['id', 'dateCreated']),
) {
  @Expose()
  id: string;
}

export interface GetAllArgs {
  skip?: number;
  limit?: number;
  like?: {
    name?: string;
  };
}

export interface CountAllArgs {
  like?: {
    name?: string;
  };
}
