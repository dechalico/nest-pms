export class PmsWarrantiesArgs {
  pmsId: string;
}

class Engineer {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

class Warranty {
  id: string;
  engineers: Array<Engineer | string>;
  name: string;
  warrantyDate: Date;
  isDone: boolean;
  dateCreated: Date;
  dateUpdated: Date;
}

class PmsWarranties {
  id: string;
  pmsId: string;
  warrantyTypeId: string;
  warranties: Array<Warranty | string>;
  isLock: boolean;
  dateCreated: Date;
  dateUpdated?: Date;
}

export class PmsWarrantiesResult {
  warranties: Array<PmsWarranties>;
}
