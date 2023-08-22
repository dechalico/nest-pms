import { Module } from '@nestjs/common';
import { BaseServicesModule } from '../baseServices/baseServices.module';
import { CreateOfficeHandler } from './officeServices/createOfficeHandler';
import { ICreateOfficeHandler } from './officeServices/handlers/iCreateOfficeHandler';
import { GetOfficesHandler } from './officeServices/getOfficesHandler';
import { IGetOfficesHandler } from './officeServices/handlers/IGetOfficesHandler';

@Module({
  imports: [BaseServicesModule],
  providers: [
    {
      provide: ICreateOfficeHandler,
      useClass: CreateOfficeHandler,
    },
    {
      provide: IGetOfficesHandler,
      useClass: GetOfficesHandler,
    },
  ],
  exports: [ICreateOfficeHandler, IGetOfficesHandler],
})
export class AdminModule {}
