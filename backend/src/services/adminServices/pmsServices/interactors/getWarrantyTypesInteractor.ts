export class WarrantyType {
  id: string;
  name: string;
  algorithm: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export class GetWarrantyTypeArgs {}

export class GetWarrantyTypeResult {
  warrantyTypes: WarrantyType[];
}
