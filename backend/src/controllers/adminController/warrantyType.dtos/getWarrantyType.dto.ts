import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Pagination } from '../common.dtos/pagination.dto';
import { ToLowerCase } from '../../../decorators/string.decorator';

export class WarrantyType {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  algorithm: string;

  @Expose()
  algoMessage: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;
}

export class GetWarrantyTypeResult {
  @Expose()
  warrantyTypes: WarrantyType[];

  @Expose()
  pagination: Pagination;
}

export class GetWarrantyTypesArgs {
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
