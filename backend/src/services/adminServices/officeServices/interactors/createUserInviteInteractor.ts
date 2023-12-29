export class CreateUserInviteArgs {
  areaOfficeId: string;
}

export class CreateUserInviteResult {
  token: string;
  guid: string;
  generatedUrl: string;
}
