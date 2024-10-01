import { OmitType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsDateString, IsString } from 'class-validator';

class Warranty {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsDateString()
  warrantyDate: Date;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  engineers: string[];

  @Expose()
  @IsBoolean()
  isDone: boolean;
}

export class UpdateWarrantyArgs extends OmitType(Warranty, ['id']) {
  @IsString()
  warrantyHistoryId: string;
}

export class UpdateWarrantyResult extends Warranty {}
