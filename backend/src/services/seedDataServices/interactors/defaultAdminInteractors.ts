import { OmitType } from '@nestjs/mapped-types';

export class DefaultAdminArgs {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: Array<string>;
}

export class DefaultAdminResult extends OmitType(DefaultAdminArgs, [
  'password',
  'roles',
]) {
  hashedPassword: string;
  dateCreated: Date;
}
