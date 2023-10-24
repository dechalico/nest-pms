import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';

export class RegisterArgs {
  @Expose()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  guid: string;
}

export class RegisterResult extends OmitType(RegisterArgs, ['password', 'token', 'guid']) {
  @Expose()
  id: string;
}
