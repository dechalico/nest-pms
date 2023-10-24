import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';

export class UserSchema {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  password: string;

  @Expose()
  roles: Array<string>;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;

  @Expose()
  areaOfficeId: string;
}

export class CreateUser extends OmitType(UserSchema, ['id', 'dateCreated', 'dateUpdated']) {}

export class UpdateUser extends OmitType(PartialType(UserSchema), ['dateCreated', 'dateUpdated']) {
  @Expose()
  id: string;
}
