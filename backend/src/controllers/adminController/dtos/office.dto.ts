import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOffice {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  city: string;
}

export class CreateOfficeResult {
  @Expose()
  name: string;

  @Expose()
  city: string;

  @Expose()
  dateCreated: Date;
}
