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
import { IRegisterEngineerHandler } from './officeServices/handlers/IRegisterEngineerHandler';
import { RegisterEngineerHandler } from './officeServices/services/registerEngineerHandler';
import { GetEngineersHandler } from './officeServices/services/getEngineersHandler';
import { IGetEngineersHandler } from './officeServices/handlers/iGetEngineersHandler';
import { IUpdateEngineerHandler } from './officeServices/handlers/iUpdateEngineerHandler';
import { UpdateEngineerHandler } from './officeServices/services/updateEngineerHandler';
import { ICreateClientHandler } from './pmsServices/handlers/iCreateClientHandler';
import { CreateClientHandler } from './pmsServices/services/createClientHandler';
import { GetClientsHandler } from './pmsServices/services/getClientsHandler';
import { IGetClientsHandler } from './pmsServices/handlers/iGetClientsHandler';
import { ICreateEquipmentBrandHandler } from './pmsServices/handlers/iCreateEquipmentBrandHandler';
import { CreateEquipmentBrandHandler } from './pmsServices/services/createEquipmentBrandHandler';
import { ICreateWarrantyType } from './pmsServices/handlers/iCreateWarrantyTypeHandler';
import { CreateWarrantyTypeHandler } from './pmsServices/services/createWarrantyTypeHandler';

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
    {
      provide: IRegisterEngineerHandler,
      useClass: RegisterEngineerHandler,
    },
    {
      provide: IGetEngineersHandler,
      useClass: GetEngineersHandler,
    },
    {
      provide: IUpdateEngineerHandler,
      useClass: UpdateEngineerHandler,
    },
    {
      provide: ICreateClientHandler,
      useClass: CreateClientHandler,
    },
    {
      provide: IGetClientsHandler,
      useClass: GetClientsHandler,
    },
    {
      provide: ICreateEquipmentBrandHandler,
      useClass: CreateEquipmentBrandHandler,
    },
    {
      provide: ICreateWarrantyType,
      useClass: CreateWarrantyTypeHandler,
    },
  ],
  exports: [
    ICreateOfficeHandler,
    IGetOfficesHandler,
    ICreateUserInviteHandler,
    IRegisterEngineerHandler,
    IGetEngineersHandler,
    IUpdateEngineerHandler,
    ICreateClientHandler,
    IGetClientsHandler,
    ICreateEquipmentBrandHandler,
    ICreateWarrantyType,
  ],
})
export class AdminModule {}
