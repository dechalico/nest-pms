import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class LoginArgs {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResult {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  token: string;
}
