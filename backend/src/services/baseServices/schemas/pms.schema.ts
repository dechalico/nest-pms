import { OmitType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';

class Engineer {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

export class PmsSchema {
  @Expose()
  id: string;

  @Expose()
  client: {
    id: string;
    name: string;
    city: string;
  };

  @Expose()
  equipmentBrand: {
    id: string;
    name: string;
  };

  @Expose()
  model: string;

  @Expose()
  serialNumbers: Array<string>;

  @Expose()
  fsrNumber: string;

  @Expose()
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
