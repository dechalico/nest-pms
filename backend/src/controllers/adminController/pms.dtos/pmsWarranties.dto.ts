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
  @Type(() => Engineer)
  engineers: Array<Engineer>;

  @Expose()
  isDone: boolean;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;
}

class WarrantyHistory {
  @Expose()
  id: string;

  @Expose()
  warrantyTypeId: string;

  @Expose()
  pmsId: string;

  @Expose()
  @Type(() => Warranty)
  warranties: Array<Warranty>;

  @Expose()
  isLock: boolean;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;
}

export class PmsWarrantiesResult {
  @Expose()
  @Type(() => WarrantyHistory)
  warranties: Array<WarrantyHistory>;
}
