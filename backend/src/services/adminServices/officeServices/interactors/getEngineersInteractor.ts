export class Engineer {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  areaOfficeId: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export class GetEngineersArgs {
  includes?: {
    areaOffice?: boolean;
  };
}

export class GetEngineersResult {
  engineers: Array<Engineer>;
}
