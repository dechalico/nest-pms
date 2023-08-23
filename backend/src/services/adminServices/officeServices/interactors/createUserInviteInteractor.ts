export class CreateUserInviteArgs {
  loginUsername: string;
  areaOfficeId: string;
}

export class CreateUserInviteResult {
  token: string;
  guid: string;
}
