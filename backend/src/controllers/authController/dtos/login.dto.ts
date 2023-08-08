import { IsNotEmpty } from 'class-validator';

export class LoginArgs {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResult {
  firstName: string;
  lastName: string;
  token: string;
}
