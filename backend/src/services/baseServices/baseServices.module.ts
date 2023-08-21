import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { UserService } from './services/user.service';
import { AreaOfficeService } from './services/areaOffice.service';

@Module({
  imports: [RepositoryModule],
  providers: [UserService, AreaOfficeService],
  exports: [UserService, AreaOfficeService],
})
export class BaseServicesModule {}
