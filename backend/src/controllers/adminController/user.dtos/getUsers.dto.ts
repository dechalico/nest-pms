import { Expose, Transform, Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetUsersArgs {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.toLowerCase() === 'true')
  includeOffice: boolean;
}

class AreaOffice {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  city: string;
}

class User {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  roles: string[];

  @Expose()
  areaOfficeId: string;

  @Expose()
  @Type(() => AreaOffice)
  areaOffice?: AreaOffice;
}

export class GetUsersResult {
  @Expose()
  @Type(() => User)
  users: User[];
}
