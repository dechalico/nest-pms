import { Module } from '@nestjs/common';
import { SecurityModule } from '../securityServices/sercurity.module';
import { BaseServicesModule } from '../baseServices/baseServices.module';
import { DefaultAdminService } from './defaultAdmin.service';
import { IDefaultAdminHandler } from './handlers/iDefaultAdminHandler';

@Module({
  imports: [SecurityModule, BaseServicesModule],
  providers: [
    {
      provide: IDefaultAdminHandler,
      useClass: DefaultAdminService,
    },
  ],
})
export class SeedDataModule {}
