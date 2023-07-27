export abstract class BaseEntity {
  id: string;
  date_created: Date;
  date_updated: Date;

  constructor(payload: { id: string; date_created: Date; date_updated: Date }) {
    this.id = payload.id;
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
    id: string;
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

  constructor(payload: {
    name: string;
    city: string;
    id: string;
    date_created: Date;
    date_updated: Date;
  }) {
    super(payload);
    this.name = payload.name;
    this.city = payload.city;
  }
}

export class Engineer extends BaseEntity {
  firstName: string;
  lastName: string;
  middleName: string;
  area_office_id: string;

  constructor(payload: {
    firstName: string;
    lastName: string;
    middleName: string;
    area_office_id: string;
    id: string;
    date_created: Date;
    date_updated: Date;
  }) {
    super(payload);
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.middleName = payload.middleName;
    this.area_office_id = payload.area_office_id;
  }
}

export class EquipmentBrand extends BaseEntity {
  name: string;
  constructor(payload: {
    name: string;
    id: string;
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
    id: string;
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
    id: string;
    date_created: Date;
    date_updated: Date;
  }) {
    super(payload);
    this.name = payload.name;
    this.algorithm = payload.algorithm;
  }
}
