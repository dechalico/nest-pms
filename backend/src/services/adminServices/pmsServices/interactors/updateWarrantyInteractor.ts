import { PartialType } from '@nestjs/mapped-types';

class Warranty {
  id: string;
  engineers: Array<string>;
  warrantyDate: Date;
  isDone: boolean;
}

export class UpdateWarrantyArgs extends Warranty {
  warrantyHistoryId: string;
}

export class UpdateWarrantyResult extends Warranty {}
