class Engineer {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

class Client {
  id: string;
  name: string;
  city: string;
}

class EquipmentBrand {
  id: string;
  name: string;
}

class Pms {
  id: string;
  client: Client;
  equipmentBrand: EquipmentBrand;
  model: string;
  serialNumbers: Array<string>;
  fsrNumber: string;
  engineers: Array<Engineer>;
  areaOfficeId: string;
  dateInstalled: Date;
  remarks: string;
  status: string;
  warranty: string;
}

export class GetPmsArgs {
  id: string;
}

export class GetPmsResult {
  pms: Pms;
}
