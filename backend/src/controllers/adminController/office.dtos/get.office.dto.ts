import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Pagination } from '../common.dtos/pagination.dto';
import { ToLowerCase } from '../../../decorators/string.decorator';

class Office {
  @Expose()
  name: string;

  @Expose()
  city: string;

  @Expose()
  dateCreated: Date;
}

export class GetOfficeResult {
  @Expose()
  offices: Array<Office>;

  @Expose()
  pagination: Pagination;
}

export class GetOfficesArgs {
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
