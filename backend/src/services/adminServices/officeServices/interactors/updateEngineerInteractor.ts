import { PartialType } from '@nestjs/mapped-types';

class Engineer {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  areaOfficeId: string;
}

export class UpdateEngineerArgs extends PartialType(Engineer) {
  id: string;
}

export class UpdateEngineerResult extends Engineer {}
