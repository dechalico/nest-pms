import { Expose } from 'class-transformer';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class InvitedTokenSchema {
  @Expose()
  id: string;

  @Expose()
  token: string;

  @Expose()
  guid: string;

  @Expose()
  isUsed: boolean;

  @Expose()
  areaOfficeId: string;

  @Expose()
  usedBy: string;

  @Expose()
  dateUsed: Date;

  @Expose()
  createdBy: string;

  @Expose()
  dateCreated: Date;
}

export class CreateInvitedToken extends OmitType(InvitedTokenSchema, [
  'id',
  'dateCreated',
]) {}

export class UpdateInvitedToken extends PartialType(CreateInvitedToken) {
  @Expose()
  id: string;
}
