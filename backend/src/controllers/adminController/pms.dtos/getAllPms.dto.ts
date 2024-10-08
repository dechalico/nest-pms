import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Pagination } from '../common.dtos/pagination.dto';

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
  @Type(() => Engineer)
  engineers: Engineer[];

  @Expose()
  model: string;

  @Expose()
  serialNumbers: string[];

  @Expose()
  fsrNumber: string;

  @Expose()
  remarks: string;

  @Expose()
  dateInstalled: Date;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;
}

export class GetAllPmsResult {
  @Expose()
  @Type(() => Pms)
  pms: Pms[];

  @Expose()
  pagination?: Pagination;
}

export class GetPmsArgs {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(20)
  pageSize?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  currentPage?: number;
}
