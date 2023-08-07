export class CreateLoginTokenArgs {
  username: string;
  password: string;
}

export class CreateLoginTokenResult {
  token: string;
  firstName: string;
  lastName: string;
}
