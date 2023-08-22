import { OmitType, PartialType } from '@nestjs/mapped-types';

export class UserSchema {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  roles: Array<string>;
  dateCreated: Date;
  dateUpdated: Date;
  areaOfficeId: string;
}

export class CreateUser extends OmitType(UserSchema, [
  'id',
  'dateCreated',
  'dateUpdated',
]) {}

export class UpdateUser extends OmitType(PartialType(UserSchema), [
  'dateCreated',
  'dateUpdated',
]) {
  id: string;
}
