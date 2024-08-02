import type { Client } from './client';
import type { EquipmentBrand } from './equipmentBrand';
import type { Engineer } from '../management/engineer';

export interface Pms {
  id: string;
  client: Client;
  equipmentBrand: EquipmentBrand;
  engineers: Engineer[];
  model: string;
  serialNumbers: string[];
  fsrNumber: string;
  remarks: string;
  dateInstalled: Date;
  dateCreated: Date;
  dateUpdated: Date;
  warranty: string;
}
