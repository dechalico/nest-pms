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
}

export class CreateUser extends OmitType(UserSchema, [
  'id',
  'dateCreated',
  'dateUpdated',
]) {}

export class UpdateUser extends PartialType(UserSchema) {
  id: string;
}
