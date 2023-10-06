import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';

export class ClientSchema {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  city: string;

  @Expose()
  areaOfficeId: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;
}

export class CreateClientSchema extends OmitType(ClientSchema, [
  'dateCreated',
  'dateUpdated',
  'id',
]) {}

export class UpdateClientSchema extends PartialType(CreateClientSchema) {
  id: string;
}

export interface GetAllArgs {
  areaOfficeId?: string;
}
