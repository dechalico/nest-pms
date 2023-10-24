export class Client {
  id: string;
  name: string;
  city: string;
  areaOfficeId: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export class GetClientArgs {}

export class GetClientResult {
  clients: Array<Client>;
}
