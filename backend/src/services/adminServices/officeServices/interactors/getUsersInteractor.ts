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
}

export class GetUsersArgs {
  includes?: {
    areaOffice?: boolean;
  };
}
