import { OmitType } from '@nestjs/mapped-types';

export class RegisterUserArgs {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  token: string;
  guid: string;
}

export class RegisterUserResult extends OmitType(RegisterUserArgs, ['password', 'token', 'guid']) {
  id: string;
}
