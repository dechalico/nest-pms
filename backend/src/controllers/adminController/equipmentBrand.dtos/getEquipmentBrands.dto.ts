import { Expose } from 'class-transformer';

class EquipmentBrand {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;
}

export class GetEquipmentBrandsResult {
  @Expose()
  equipmentBrands: EquipmentBrand[];
}
