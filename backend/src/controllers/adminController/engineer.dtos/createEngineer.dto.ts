import { Expose, Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { Pagination } from '../common.dtos/pagination.dto';

class Engineer {
  @Expose()
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Expose()
  @IsOptional()
  @IsString()
  middleName: string;
}

export class CreateEngineerArgs extends OmitType(Engineer, ['id']) {}

export class CreateEngineerResult extends Engineer {}

export class GetAllEngineersResult {
  @Expose()
  engineers: Array<Engineer>;

  @Expose()
  pagination: Pagination;
}

export class GetAllEngineersArgs {
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
}
