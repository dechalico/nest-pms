export class UserSchema {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  roles: Array<string>;
}
