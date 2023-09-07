import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEngineerArgs {
  @Expose()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Expose()
  @IsOptional()
  @IsString()
  middleName: string;
}

export class CreateEngineerResult extends CreateEngineerArgs {
  @Expose()
  id: string;
}
