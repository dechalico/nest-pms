import { ObjectId } from 'mongodb';
import { Transform, Expose, Type } from 'class-transformer';

export abstract class BaseEntity {
  @Expose({ name: 'id' })
  @Transform(({ value }: { value: ObjectId }) => value.toString())
  _id: ObjectId | string;

  @Expose({ name: 'dateCreated' })
  date_created: Date;
  @Expose({ name: 'dateUpdated' })
  date_updated: Date;
}

export class AreaOffice extends BaseEntity {
  @Expose()
  name: string;

  @Expose()
  city: string;
}

export class Client extends BaseEntity {
  @Expose()
  name: string;

  @Expose()
  city: string;

  @Expose({ name: 'areaOfficeId' })
  @Transform(({ value }: { value: ObjectId }) => value.toString())
  area_office_id: ObjectId | string;
}

export class Engineer extends BaseEntity {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  middleName: string;

  @Expose({ name: 'areaOfficeId' })
  @Transform(({ value }: { value: ObjectId }) => value.toString())
  area_office_id: ObjectId | string;

  @Expose({ name: 'createdBy' })
  @Transform(({ value }: { value: ObjectId }) => value.toString())
  created_by: ObjectId | string;

  @Expose({ name: 'areaOffice' })
  @Type(() => AreaOffice)
  area_office?: Record<string, any>;
}

export class EquipmentBrand extends BaseEntity {
  @Expose()
  name: string;
}

export class User extends BaseEntity {
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

  @Expose({ name: 'areaOfficeId' })
  @Transform(({ value }: { value: ObjectId }) => value.toString())
  area_office_id: ObjectId | string;

  @Expose({ name: 'areaOffice' })
  @Type(() => AreaOffice)
  area_office?: Record<string, any>;
}

/**
 * This is the algorithm format value
 * for future reference.
 *
 * {D|W|M|Y}|{interval}|{D|W|M|Y}|{Duration}
 * D=day
 * W=week
 * M=month
 * Y=year
 * interval= number of intervals in a specified day
 * duration= number of warranty durations in a specified day
 * Example:
 * M|3|Y|1
 *
 *
 **/
export class WarrantyType extends BaseEntity {
  @Expose()
  name: string;

  @Expose()
  algorithm: string;
}

export class Warranty {
  @Expose({ name: 'id' })
  @Transform(({ value }: { value: ObjectId }) => value.toString())
  _id: ObjectId | string;

  @Expose()
  name: string;

  @Expose({ name: 'warrantyDate' })
  warranty_date: Date;

  @Expose({ name: 'engineersId' })
  @Transform(({ value }: { value: Array<ObjectId> }) => value.map((v) => v.toString()))
  engineers_id: Array<ObjectId | string>;

  @Expose()
  isDone: boolean;
}

export class WarrantyHistory extends BaseEntity {
  @Expose({ name: 'warrantyTypeId' })
  @Transform(({ value }: { value: ObjectId }) => value.toString())
  warranty_type_id: ObjectId | string;

  @Expose({ name: 'pmsId' })
  @Transform(({ value }: { value: ObjectId }) => value.toString())
  pms_id: ObjectId | string;

  @Expose()
  isLock: boolean;

  @Expose()
  @Type(() => Warranty)
  warranties: Array<Warranty>;
}

export class Pms extends BaseEntity {
  @Expose()
  @Type(() => Client)
  client: Client;

  @Expose()
  @Type(() => EquipmentBrand)
  equipmentBrand: EquipmentBrand;

  @Expose()
  model: string;

  @Expose()
  serialNumbers: Array<string>;

  @Expose()
  fsrNumber: string;

  @Expose({ name: 'engineersId' })
  @Transform(({ value }: { value: Array<ObjectId> }) => value.map((v) => v.toString()))
  engineers_id: Array<ObjectId | string>;

  @Expose()
  dateInstalled: Date;

  @Expose()
  remarks: string;

  @Expose()
  status: string;
}

export class InvitedToken extends BaseEntity {
  @Expose()
  token: string;

  @Expose()
  guid: string;

  @Expose({ name: 'isUsed' })
  is_used: boolean;

  @Expose({ name: 'areaOfficeId' })
  @Transform(({ value }: { value: ObjectId }) => value && value.toString())
  area_office_id: ObjectId | string;

  @Expose({ name: 'usedBy' })
  @Transform(({ value }: { value: ObjectId }) => value && value.toString())
  used_by: ObjectId | string;

  @Expose({ name: 'dateUsed' })
  date_used: Date;

  @Expose({ name: 'createdBy' })
  @Transform(({ value }: { value: ObjectId }) => value && value.toString())
  created_by: ObjectId | string;
}

export class GetAllArgs {
  filter?: any;
  include?: any;
}
