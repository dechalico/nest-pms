import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Pagination } from '../common.dtos/pagination.dto';

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
}
