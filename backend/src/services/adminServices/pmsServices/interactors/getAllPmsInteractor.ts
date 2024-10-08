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

class Pms {
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

export class GetAllPmsArgs {
  includePagination: boolean;
  pageSize: number;
  currentPage: number;
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
}

export class GetAllPmsResult {
  pms: Pms[];
  pagination?: Pagination;
}
