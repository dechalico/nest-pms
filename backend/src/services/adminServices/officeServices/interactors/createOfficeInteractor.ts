import { Expose } from 'class-transformer';

export class CreateOfficeArgs {
  @Expose()
  name: string;

  @Expose()
  city: string;
}

export class CreateOfficeResult {
  name: string;
  city: string;
  dateCreated: Date;
}
