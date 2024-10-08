export class Engineer {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  areaOfficeId: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export class GetEngineersArgs {
  includes?: {
    areaOffice?: boolean;
  };
  includePagination: boolean;
  pageSize: number;
  currentPage: number;
}

export class GetEngineersResult {
  engineers: Array<Engineer>;
  pagination?: Pagination;
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
}
