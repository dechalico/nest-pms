import { OmitType } from '@nestjs/mapped-types';
import { Expose, Type } from 'class-transformer';

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

class Warranty {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  warrantyDate: Date;

  @Expose()
  engineers: Array<Engineer | string>;

  @Expose()
  isDone: boolean;
}

export class WarrantyHistorySchema {
  @Expose()
  id: string;

  @Expose()
  warrantyTypeId: string;

  @Expose()
  pmsId: string;

  @Expose()
  @Type(() => Warranty)
  warranties: Array<Warranty | string>;

  @Expose()
  isLocked: boolean;
}

export class CreateWarrantyHistory extends OmitType(WarrantyHistorySchema, ['id', 'warranties']) {
  @Expose()
  warranties: Array<string>;
}
