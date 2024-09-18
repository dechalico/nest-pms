import { ObjectId } from 'mongodb';
import { Transform, Expose, Type } from 'class-transformer';

export abstract class BaseEntity {
  @Expose({ name: 'id' })
  @Transform(({ value }: { value: ObjectId }) => value?.toString())
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
  @Transform(({ value }: { value: ObjectId }) => value?.toString())
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
  @Transform(({ value }: { value: ObjectId }) => value?.toString())
  area_office_id: ObjectId | string;

  @Expose({ name: 'createdBy' })
  @Transform(({ value }: { value: ObjectId }) => value?.toString())
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
  @Transform(({ value }: { value: ObjectId }) => value?.toString())
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

export class Warranty extends BaseEntity {
  @Expose()
  name: string;

  @Expose({ name: 'warrantyDate' })
  warranty_date: Date;

  @Expose({ name: 'engineers' })
  @Transform(({ value }: { value: Array<ObjectId | Engineer> }) =>
    value.map((v) => (v instanceof Engineer ? v : v?.toString())),
  )
  @Type((t) => {
    if (t.object.engineers_id.length > 0 && t.object.engineers_id[0] instanceof ObjectId)
      return ObjectId;
    else return Engineer;
  })
  engineers_id: Array<ObjectId | string | Engineer>;

  @Expose()
  isDone: boolean;
}

export class WarrantyHistory extends BaseEntity {
  @Expose({ name: 'warrantyTypeId' })
  @Transform(({ value }: { value: ObjectId }) => value?.toString())
  warranty_type_id: ObjectId | string;

  @Expose({ name: 'pmsId' })
  @Transform(({ value }: { value: ObjectId }) => value?.toString())
  pms_id: ObjectId | string;

  @Expose()
  isLock: boolean;

  @Expose({ name: 'warranties' })
  @Transform(({ value }: { value: Array<ObjectId | Warranty> }) =>
    value.map((v) => (v instanceof ObjectId ? v?.toString() : v)),
  )
  @Type((t) => {
    if (t.object.warranties.length > 0 && t.object.warranties[0] instanceof ObjectId)
      return ObjectId;
    else return Warranty;
  })
  warranties: Array<Warranty | ObjectId | string>;
}

export class Pms extends BaseEntity {
  @Expose()
  @Type(() => Client)
  client: Partial<Client>;

  @Expose()
  @Type(() => EquipmentBrand)
  equipmentBrand: Partial<EquipmentBrand>;

  @Expose()
  @Type(() => Engineer)
  engineers: Array<Engineer>;

  @Expose()
  model: string;

  @Expose()
  serialNumbers: Array<string>;

  @Expose()
  fsrNumber: string;

  @Expose({ name: 'areaOfficeId' })
  @Transform(({ value }: { value: ObjectId }) => value?.toString())
  area_office_id: ObjectId | string;

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
  @Transform(({ value }: { value: ObjectId }) => value?.toString())
  area_office_id: ObjectId | string;

  @Expose({ name: 'usedBy' })
  @Transform(({ value }: { value: ObjectId }) => value?.toString())
  used_by: ObjectId | string;

  @Expose({ name: 'dateUsed' })
  date_used: Date;

  @Expose({ name: 'createdBy' })
  @Transform(({ value }: { value: ObjectId }) => value?.toString())
  created_by: ObjectId | string;
}

export class GetAllArgs {
  filter?: any;
  include?: any;
}
