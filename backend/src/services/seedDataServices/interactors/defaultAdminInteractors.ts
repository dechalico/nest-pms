import { OmitType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';

export class DefaultAdminArgs {
  @Expose()
  username: string;

  @Expose()
  password: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  roles: Array<string>;
}

export class DefaultAdminResult extends OmitType(DefaultAdminArgs, [
  'password',
  'roles',
]) {
  @Expose()
  hashedPassword: string;
}
