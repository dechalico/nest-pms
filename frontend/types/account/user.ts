export interface User {
  firstName: string;
  lastName: string;
  roles: Array<string>;
}

export interface CurrentLogUser {
  user?: Partial<User>;
  logginDate?: Date;
  authenticated: Boolean;
}
