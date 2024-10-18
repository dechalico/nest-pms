import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Expose, Type } from 'class-transformer';
import { AreaOfficeSchema } from './areaOffice.schema';

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

  @Expose()
  @Type(() => AreaOfficeSchema)
  areaOffice?: AreaOfficeSchema;
}

export class CreateUser extends OmitType(UserSchema, ['id', 'dateCreated', 'dateUpdated']) {}

export class UpdateUser extends OmitType(PartialType(UserSchema), ['dateCreated', 'dateUpdated']) {
  @Expose()
  id: string;
}

export class GetUsersArgs {
  includes?: {
    areaOffice?: boolean;
  };
  skip: number;
  limit: number;
  like?: {
    name?: string;
  };
}

export interface CountAllArgs {
  like?: {
    name?: string;
  };
}
