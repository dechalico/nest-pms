import { Module } from '@nestjs/common';
import { BaseServicesModule } from '../baseServices/baseServices.module';
import { DefaultAdminService } from './defaultAdmin.service';
import { IDefaultAdminHandler } from './handlers/iDefaultAdminHandler';

@Module({
  imports: [BaseServicesModule],
  providers: [
    {
      provide: IDefaultAdminHandler,
      useClass: DefaultAdminService,
    },
  ],
})
export class SeedDataModule {}
