import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEquipmentBrandArgs {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateEquipmentBrandResult {
  @Expose()
  name: string;

  @Expose()
  dateCreated: Date;
}
