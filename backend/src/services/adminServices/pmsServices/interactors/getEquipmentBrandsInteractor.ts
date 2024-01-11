export class EquipmentBrand {
  id: string;
  name: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export class GetEquipmentBrandArgs {}

export class GetEquipmentBrandResult {
  equipmentBrands: Array<EquipmentBrand>;
}
