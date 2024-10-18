export class Client {
  id: string;
  name: string;
  city: string;
  areaOfficeId: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
}

export class GetClientArgs {
  includePagination: boolean;
  pageSize: number;
  currentPage: number;
  like?: {
    name?: string;
  };
}

export class GetClientResult {
  clients: Array<Client>;
  pagination?: Pagination;
}
