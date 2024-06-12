import { OmitType } from '@nestjs/mapped-types';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePmsArgs {
  @Expose()
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  equipmentBrandId: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  model: string;

  @Expose()
  @IsArray()
  @IsNotEmpty()
  serialNumbers: string[];

  @Expose()
  @IsString()
  @IsNotEmpty()
  fsrNumber: string;

  @Expose()
  @IsArray()
  @IsNotEmpty()
  engineersId: string[];

  @Expose()
  @IsString()
  @IsOptional()
  remarks: string;

  @Expose()
  @IsDateString()
  @IsNotEmpty()
  dateInstalled: Date;
}

class Client {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  city: string;
}

class EquipmentBrand {
  @Expose()
  id: string;

  @Expose()
  name: string;
}

class Engineer {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  middleName: string;
}

export class CreatePmsResult extends OmitType(CreatePmsArgs, [
  'clientId',
  'engineersId',
  'equipmentBrandId',
]) {
  @Expose()
  id: string;

  @Expose()
  @Type(() => Client)
  client: Client;

  @Expose()
  @Type(() => EquipmentBrand)
  equipmentBrand: EquipmentBrand;

  @Expose()
  @Type(() => Engineer)
  engineers: Array<Engineer>;
}
