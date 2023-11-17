import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWarrantyTypeArgs {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  algorithm: string;
}

export class CreateWarrantyTypeResult {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  algorithm: string;

  @Expose()
  dateCreated: Date;
}
