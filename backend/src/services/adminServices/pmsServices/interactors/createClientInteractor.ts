import { OmitType } from '@nestjs/mapped-types';

class Client {
  id: string;
  name: string;
  city: string;
  areaOfficeId: string;
  dateCreated: Date;
}

export class CreateClientArgs extends OmitType(Client, ['areaOfficeId', 'dateCreated', 'id']) {}

export class CreateClientResult extends Client {}
