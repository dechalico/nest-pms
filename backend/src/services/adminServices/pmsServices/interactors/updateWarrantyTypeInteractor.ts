export class UpdateWarrantyTypeArgs {
  id: string;
  name?: string;
  algorithm?: string;
}

export class UpdateWarrantypeResult {
  id: string;
  name: string;
  algorithm: string;
  dateUpdated: Date;
}
