export class Office {
  id: string;
  name: string;
  city: string;
  dateCreated: Date;
}

export class GetOfficesArgs {}

export class GetOfficesResult {
  offices: Array<Office>;
}
