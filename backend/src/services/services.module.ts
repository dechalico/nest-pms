import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository/repository.module';
import { BaseServicesModule } from './baseServices/baseServices.module';

@Module({
  imports: [RepositoryModule, BaseServicesModule],
})
export class ServiceModules {}
