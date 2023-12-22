import { ObjectId } from 'mongodb';
import { Transform, Expose } from 'class-transformer';

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

  @Expose()
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

interface Warranty {
  id?: ObjectId | string;
  name: string;
  warranty_date: Date;
  engineers: Array<string>;
  isDone: boolean;
}

interface WarrantyHistory {
  id?: ObjectId | string;
  date_extended: Date;
  isLock: boolean;
  warranties: Array<Warranty>;
}

interface EngineerPms {
  firstName: string;
  lastName: string;
  middleName: string;
  area_office_id: ObjectId | string;
  id: ObjectId | string;
  date_created: Date;
  date_updated: Date;
}

interface PmsPayload {
  id?: ObjectId | string;
  date_created: Date;
  date_updated: Date;
  client: {
    name: string;
    city: string;
    area_office_id: ObjectId | string;
    id: ObjectId | string;
    date_created: Date;
    date_updated: Date;
  };
  equipmentBrand: {
    name: string;
    id: ObjectId | string;
    date_created: Date;
    date_updated: Date;
  };
  model: string;
  serialNumber: string;
  fsrNumber: string;
  engineers: Array<EngineerPms>;
  dateInstalled: Date;
  remarks: string;
  status: string;
  warranties: Array<WarrantyHistory>;
}

export class Pms extends BaseEntity {
  client: Client;
  equipmentBrand: EquipmentBrand;
  model: string;
  serialNumber: string;
  fsrNumber: string;
  engineers: Array<Engineer>;
  dateInstalled: Date;
  remarks: string;
  status: string;
  warranties: Array<WarrantyHistory>;

  // constructor(payload: PmsPayload) {
  //   super(payload);
  //   this.client = new Client(payload.client);
  //   this.equipmentBrand = new EquipmentBrand(payload.equipmentBrand);
  //   this.model = payload.model;
  //   this.serialNumber = payload.serialNumber;
  //   this.fsrNumber = payload.fsrNumber;
  //   this.engineers = payload.engineers.map((e) => new Engineer(e));
  //   this.dateInstalled = payload.dateInstalled;
  //   this.remarks = payload.remarks;
  //   this.warranties = payload.warranties.map((w) => {
  //     w.id = !w.id ? new ObjectId() : objectIdCreator(w.id);
  //     w.warranties = w.warranties.map((e) => {
  //       e.id = !e.id ? new ObjectId() : objectIdCreator(e.id);
  //       return e;
  //     });
  //     return w;
  //   });
  // }
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
