import { ObjectId } from 'mongodb';
import { Transform, Expose } from 'class-transformer';
import { objectIdCreator } from './helper';

export abstract class BaseEntity {
  @Expose({ name: 'id' })
  @Transform(({ value }: { value: ObjectId }) => value.toString())
  _id: ObjectId | undefined;
  date_created: Date;
  date_updated: Date;

  constructor(payload: {
    id?: string | ObjectId;
    date_created: Date;
    date_updated: Date;
  }) {
    this._id = objectIdCreator(payload.id);
    this.date_created = payload.date_created;
    this.date_updated = payload.date_updated;
  }
}

export class AreaOffice extends BaseEntity {
  name: string;
  city: string;

  constructor(payload: {
    name: string;
    city: string;
    id?: string | ObjectId;
    date_created: Date;
    date_updated: Date;
  }) {
    super(payload);
    this.name = payload.name;
    this.city = payload.city;
  }
}

export class Client extends BaseEntity {
  name: string;
  city: string;

  @Transform(({ value }: { value: ObjectId }) => value.toString())
  area_office_id: ObjectId;

  constructor(payload: {
    name: string;
    city: string;
    area_office_id: ObjectId | string;
    id?: string | ObjectId;
    date_created: Date;
    date_updated: Date;
  }) {
    super(payload);
    this.name = payload.name;
    this.city = payload.city;
    this.area_office_id = objectIdCreator(payload.area_office_id);
  }
}

export class Engineer extends BaseEntity {
  firstName: string;
  lastName: string;
  middleName: string;

  @Transform(({ value }: { value: ObjectId }) => value.toString())
  area_office_id: string | ObjectId;

  constructor(payload: {
    firstName: string;
    lastName: string;
    middleName: string;
    area_office_id: ObjectId | string;
    id?: string | ObjectId;
    date_created: Date;
    date_updated: Date;
  }) {
    super(payload);
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.middleName = payload.middleName;
    this.area_office_id = objectIdCreator(payload.area_office_id);
  }
}

export class EquipmentBrand extends BaseEntity {
  name: string;
  constructor(payload: {
    name: string;
    id?: string | ObjectId;
    date_created: Date;
    date_updated: Date;
  }) {
    super(payload);
    this.name = payload.name;
  }
}

export class User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  roles: Array<string>;

  constructor(payload: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    roles: Array<string>;
    id?: string | ObjectId;
    date_created: Date;
    date_updated: Date;
  }) {
    super(payload);
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.email = payload.email;
    this.username = payload.username;
    this.password = payload.password;
    this.roles = payload.roles;
  }
}

export class WarrantyType extends BaseEntity {
  name: string;
  algorithm: string;

  constructor(payload: {
    name: string;
    algorithm: string;
    id?: string | ObjectId;
    date_created: Date;
    date_updated: Date;
  }) {
    super(payload);
    this.name = payload.name;
    this.algorithm = payload.algorithm;
  }
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

  constructor(payload: PmsPayload) {
    super(payload);
    this.client = new Client(payload.client);
    this.equipmentBrand = new EquipmentBrand(payload.equipmentBrand);
    this.model = payload.model;
    this.serialNumber = payload.serialNumber;
    this.fsrNumber = payload.fsrNumber;
    this.engineers = payload.engineers.map((e) => new Engineer(e));
    this.dateInstalled = payload.dateInstalled;
    this.remarks = payload.remarks;
    this.warranties = payload.warranties.map((w) => {
      w.id = !w.id ? new ObjectId() : objectIdCreator(w.id);
      w.warranties = w.warranties.map((e) => {
        e.id = !e.id ? new ObjectId() : objectIdCreator(e.id);
        return e;
      });
      return w;
    });
  }
}
