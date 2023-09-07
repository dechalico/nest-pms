export class RegisterEngineerArgs {
  firstName: string;
  lastName: string;
  middleName: string;
}

export class RegisterEngineerResult extends RegisterEngineerArgs {
  id: string;
  areaOfficeId: string;
}
