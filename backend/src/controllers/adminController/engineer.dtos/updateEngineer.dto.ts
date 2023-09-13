import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

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
  @IsString()
  middleName: string;
}

export class UpdateEngineerArgs extends OmitType(Engineer, ['id']) {}

export class UpdateEngineerResult extends Engineer {}
