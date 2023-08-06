export class UserSchema {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  roles: Array<string>;
  dateCreated: Date;
  dateUpdated: Date;
}

export interface CreateUserSchema {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  roles: Array<string>;
}
