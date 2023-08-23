import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { UserService } from './services/user.service';
import { AreaOfficeService } from './services/areaOffice.service';
import { InviteTokenService } from './services/inviteToken.service';
import { SecurityModule } from '../securityServices/sercurity.module';

@Module({
  imports: [RepositoryModule, SecurityModule],
  providers: [UserService, AreaOfficeService, InviteTokenService],
  exports: [UserService, AreaOfficeService, InviteTokenService],
})
export class BaseServicesModule {}
