import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository/repository.module';
import { BaseServicesModule } from './baseServices/baseServices.module';
import { SecurityModule } from './securityServices/sercurity.module';
import { SeedDataModule } from './seedDataServices/seedData.module';

@Module({
  imports: [
    RepositoryModule,
    BaseServicesModule,
    SecurityModule,
    SeedDataModule,
  ],
})
export class ServiceModules {}
