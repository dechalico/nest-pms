import type { Engineer } from '../management/engineer';

export interface WarrantyHistory {
  id: string;
  warrantyTypeId: string;
  pmsId: string;
  warranties: Warranty[];
  isLock: boolean;
  dateCreated: Date;
  dateUpdated: Date;
}

export interface Warranty {
  id: string;
  name: string;
  warrantyDate: Date;
  engineers: Engineer[];
  isDone: boolean;
  dateCreated: Date;
  dateUpdated: Date;
}
