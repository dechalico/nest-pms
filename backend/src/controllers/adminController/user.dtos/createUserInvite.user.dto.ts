import { IsNotEmpty } from 'class-validator';

export class CreateUserInviteArgs {
  @IsNotEmpty()
  areaOfficeId: string;
}

export class CreateUserInviteResult {
  token: string;
  guid: string;
}
