import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateInviteResult {
  @Expose()
  isvalid: boolean;
}

export class ValidateInviteArgs {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @IsString()
  guid: string;
}
