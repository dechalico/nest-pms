import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Pagination } from '../common.dtos/pagination.dto';
import { ToLowerCase } from '../../../decorators/string.decorator';

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

  @IsOptional()
  @IsString()
  @ToLowerCase()
  searchBy?: string;

  @IsOptional()
  @IsString()
  searchValue?: string;
}
