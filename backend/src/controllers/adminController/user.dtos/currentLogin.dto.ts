import { Expose } from 'class-transformer';

export class CurrentLoginResult {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  roles: string[];
}
