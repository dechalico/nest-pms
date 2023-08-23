export class CurrentUserArgs {}

export class CurrentUserResult {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  areaOfficeId: string;
  roles: Array<string>;
}
