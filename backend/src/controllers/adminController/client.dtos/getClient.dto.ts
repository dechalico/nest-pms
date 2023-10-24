import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

class Client {
  @Expose()
  id: string;

  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  city: string;

  @Expose()
  areaOfficeId: string;

  @Expose()
  dateCreated: Date;

  @Expose()
  dateUpdated: Date;
}

export class GetClientsResult {
  @Expose()
  clients: Array<Client>;
}
