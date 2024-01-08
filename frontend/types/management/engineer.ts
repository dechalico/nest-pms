import type { Office } from './office';

export interface Engineer {
  id: string;
  dateCreated: Date;
  dateUpdated?: Date;
  firstName: string;
  lastName: string;
  middleName?: string;
  areaOfficeId: string;
  createdBy: string;
  areaOffice?: Office;
}
