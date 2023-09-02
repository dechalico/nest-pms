import { Module } from '@nestjs/common';
import { BaseServicesModule } from '../baseServices/baseServices.module';
import { CreateOfficeHandler } from './officeServices/services/createOfficeHandler';
import { ICreateOfficeHandler } from './officeServices/handlers/iCreateOfficeHandler';
import { GetOfficesHandler } from './officeServices/services/getOfficesHandler';
import { IGetOfficesHandler } from './officeServices/handlers/IGetOfficesHandler';
import { SecurityModule } from '../securityServices/sercurity.module';
import { AuthModule } from '../authServices/auth.module';
import { ICreateUserInviteHandler } from './officeServices/handlers/iCreateUserInviteHandler';
import { CreateUserInviteHandler } from './officeServices/services/createUserInviteHandler';

@Module({
  imports: [BaseServicesModule, SecurityModule, AuthModule],
  providers: [
    {
      provide: ICreateOfficeHandler,
      useClass: CreateOfficeHandler,
    },
    {
      provide: IGetOfficesHandler,
      useClass: GetOfficesHandler,
    },
    {
      provide: ICreateUserInviteHandler,
      useClass: CreateUserInviteHandler,
    },
  ],
  exports: [ICreateOfficeHandler, IGetOfficesHandler, ICreateUserInviteHandler],
})
export class AdminModule {}
