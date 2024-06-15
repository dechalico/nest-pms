import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { UserService } from './services/user.service';
import { AreaOfficeService } from './services/areaOffice.service';
import { InviteTokenService } from './services/inviteToken.service';
import { SecurityModule } from '../securityServices/sercurity.module';
import { EngineerService } from './services/engineer.service';
import { ClientService } from './services/client.service';
import { EquipmentBrandService } from './services/equipmentBrand.service';
import { WarrantyTypeService } from './services/warrantyType.service';
import { PmsService } from './services/pms.service';
import { WarrantyService } from './services/warranty.service';

@Module({
  imports: [RepositoryModule, SecurityModule],
  providers: [
    UserService,
    AreaOfficeService,
    InviteTokenService,
    EngineerService,
    ClientService,
    EquipmentBrandService,
    WarrantyTypeService,
    PmsService,
    WarrantyService,
  ],
  exports: [
    UserService,
    AreaOfficeService,
    InviteTokenService,
    EngineerService,
    ClientService,
    EquipmentBrandService,
    WarrantyTypeService,
    PmsService,
    WarrantyService,
  ],
})
export class BaseServicesModule {}
