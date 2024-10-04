import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Pagination } from '../common.dtos/pagination.dto';

class EquipmentBrand {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;
}

export class GetEquipmentBrandsResult {
  @Expose()
  equipmentBrands: EquipmentBrand[];

  @Expose()
  pagination: Pagination;
}

export class GetEquipmentBrandsArgs {
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
