export class EquipmentBrand {
  id: string;
  name: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
}

export class GetEquipmentBrandArgs {
  includePagination: boolean;
  pageSize: number;
  currentPage: number;
}

export class GetEquipmentBrandResult {
  equipmentBrands: Array<EquipmentBrand>;
  pagination?: Pagination;
}
