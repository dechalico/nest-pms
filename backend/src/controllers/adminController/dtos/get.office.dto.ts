import { Expose } from 'class-transformer';

class Office {
  @Expose()
  name: string;

  @Expose()
  city: string;

  @Expose()
  dateCreated: Date;
}

export class GetOfficeResult {
  offices: Array<Office>;
}
