import { Expose, Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Pagination } from '../common.dtos/pagination.dto';
import { ToLowerCase } from '../../../decorators/string.decorator';

export class GetUsersArgs {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.toLowerCase() === 'true')
  includeOffice: boolean;

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

class AreaOffice {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  city: string;
}

class User {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  roles: string[];

  @Expose()
  areaOfficeId: string;

  @Expose()
  @Type(() => AreaOffice)
  areaOffice?: AreaOffice;
}

export class GetUsersResult {
  @Expose()
  @Type(() => User)
  users: User[];

  @Expose()
  pagination?: Pagination;
}
