export class ValidateUserInviteArgs {
  guid: string;
  token: string;
}

export class ValidateUserInviteResult {
  isvalid: boolean;
  usedBy: string;
  dateUsed: Date;
  createdBy: string;
  id: string;
  areaOfficeId: string;
}
