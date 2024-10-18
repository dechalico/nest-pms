export class User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];
  dateCreated: Date;
  dateUpdated: Date;
  areaOffice?: {
    id: string;
    name: string;
    city: string;
  };
}

export class GetUsersResult {
  users: User[];
  pagination?: Pagination;
}

export class GetUsersArgs {
  includes?: {
    areaOffice?: boolean;
  };
  includePagination: boolean;
  pageSize: number;
  currentPage: number;
  like?: {
    name?: string;
  };
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
}
