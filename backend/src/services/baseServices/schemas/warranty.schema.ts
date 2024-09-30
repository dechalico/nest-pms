import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';

export class Warranty {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose({ name: 'warrantyDate' })
  warrantyDate: Date;

  @Expose()
  engineers: Array<string>;

  @Expose()
  isDone: boolean;
}

export class CreateWarranty extends OmitType(Warranty, ['id']) {}

export class UpdateWarranty extends PartialType(Warranty) {
  @Expose()
  id: string;
}

export class GetAllWarrantiesArgs {
  id?: string[] | string;
}
