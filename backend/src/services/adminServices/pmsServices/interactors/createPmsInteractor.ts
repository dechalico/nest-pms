import { OmitType } from '@nestjs/mapped-types';

class Engineer {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

class Pms {
  id: string;
  client: {
    id: string;
    name: string;
    city: string;
  };
  equipmentBrand: {
    id: string;
    name: string;
  };
  model: string;
  serialNumbers: string[];
  fsrNumber: string;
  engineers: Engineer[];
  dateInstalled: Date;
  areaOfficeId: string;
  remarks: string;
  status: string;
}

export class CreatePmsArgs extends OmitType(Pms, [
  'id',
  'client',
  'equipmentBrand',
  'engineers',
  'status',
  'areaOfficeId',
]) {
  clientId: string;
  equipmentBrandId: string;
  engineersId: string[];
}

export class CreatePmsResult extends Pms {}
