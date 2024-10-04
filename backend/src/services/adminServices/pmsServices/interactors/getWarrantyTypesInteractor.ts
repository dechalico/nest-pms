export class WarrantyType {
  id: string;
  name: string;
  algorithm: string;
  algoMessage: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export class GetWarrantyTypeArgs {
  includePagination: boolean;
  pageSize: number;
  currentPage: number;
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
}

export class GetWarrantyTypeResult {
  warrantyTypes: WarrantyType[];
  pagination?: Pagination;
}
