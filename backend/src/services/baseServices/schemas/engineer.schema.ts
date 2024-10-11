import { Expose } from 'class-transformer';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class EngineerSchema {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  middleName: string;

  @Expose()
  areaOfficeId: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;

  @Expose()
  createdBy: string;
}

export class CreateEngineerSchema extends OmitType(EngineerSchema, [
  'id',
  'dateCreated',
  'dateUpdated',
]) {}

export class UpdateEngineerSchema extends PartialType(CreateEngineerSchema) {
  @Expose()
  id: string;
}

export class GetEngineersArgs {
  includes?: {
    areaOffice?: boolean;
  };
  limit: number;
  skip: number;
  like?: {
    name?: string;
  };
}

export interface CountAllArgs {
  like?: {
    name?: string;
  };
}
