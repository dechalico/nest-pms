export interface User {
  firstName: string;
  lastName: string;
  roles: Array<string>;
}

export interface CurrentLogUser {
  user?: User;
  token?: string;
  logginDate?: Date;
  isLogin: Boolean;
}
