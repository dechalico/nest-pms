import type { Office } from './office';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roles: string[];
  areaOfficeId: string;
  areaOffice?: Office;
}
