import { Expose } from 'class-transformer';
import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

class Client {
  @Expose()
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Expose()
  areaOfficeId: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;
}

export class CreateClientArgs extends PickType(Client, ['city', 'name']) {}

export class CreateClientResult extends Client {}
