import { OmitType } from '@nestjs/mapped-types';
import { Expose, Type } from 'class-transformer';

class Engineer {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  middleName: string;
}

class Client {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  city: string;
}

class EquipmentBrand {
  @Expose()
  id: string;

  @Expose()
  name: string;
}

export class PmsSchema {
  @Expose()
  id: string;

  @Expose()
  @Type(() => Client)
  client: Client;

  @Expose()
  @Type(() => EquipmentBrand)
  equipmentBrand: EquipmentBrand;

  @Expose()
  model: string;

  @Expose()
  serialNumbers: Array<string>;

  @Expose()
  fsrNumber: string;

  @Expose()
  @Type(() => Engineer)
  engineers: Array<Engineer>;

  @Expose()
  areaOfficeId: string;

  @Expose()
  dateInstalled: Date;

  @Expose()
  remarks: string;

  @Expose()
  status: string;
}

export class CreatePms extends OmitType(PmsSchema, [
  'id',
  'client',
  'equipmentBrand',
  'engineers',
]) {
  clientId: string;
  equipmentBrandId: string;
  engineersId: Array<string>;
}

export class GetPmsArgs {
  areaOfficeId?: string;
  skip: number;
  limit: number;
}

export class GetPmsByIdArgs {
  id: string;
}

export interface CountPmsArgs {
  areaOfficeId?: string;
}
