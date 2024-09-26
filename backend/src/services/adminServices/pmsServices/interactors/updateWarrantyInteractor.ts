import { PartialType } from '@nestjs/mapped-types';

class Warranty {
  id: string;
  engineersId: Array<string>;
  warrantyDate: Date;
  isDone: boolean;
}

export class UpdateWarrantyArgs extends PartialType(Warranty) {
  id: string;
}

export class UpdateWarrantyResult extends Warranty {
  updatedDate: Date;
}
