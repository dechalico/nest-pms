export class Office {
  id: string;
  name: string;
  city: string;
  dateCreated: Date;
}

export class GetOfficesArgs {
  includePagination: boolean;
  pageSize: number;
  currentPage: number;
}

export class GetOfficesResult {
  offices: Array<Office>;
  pagination?: Pagination;
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
}
