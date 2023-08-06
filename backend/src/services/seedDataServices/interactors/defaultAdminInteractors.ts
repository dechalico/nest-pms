export class DefaultAdminArgs {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: Array<string>;
}

export class DefaultAdminResult {
  username: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  dateCreated: Date;
}
