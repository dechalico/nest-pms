import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Pagination } from '../common.dtos/pagination.dto';
import { ToLowerCase } from '../../../decorators/string.decorator';

class Client {
  @Expose()
  id: string;

  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  city: string;

  @Expose()
  areaOfficeId: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;
}

export class GetClientsResult {
  @Expose()
  clients: Array<Client>;

  @Expose()
  pagination: Pagination;
}

export class GetClientsArgs {
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
