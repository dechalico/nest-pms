import { Expose } from 'class-transformer';

export class WarrantyType {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  algorithm: string;

  @Expose()
  algoMessage: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;
}

export class GetWarrantyTypeResult {
  @Expose()
  warrantyTypes: WarrantyType[];
}
