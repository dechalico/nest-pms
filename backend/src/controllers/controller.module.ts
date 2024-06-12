import { Module } from '@nestjs/common';
import { AuthController } from './authController/auth.controller';
import { AuthModule } from '../services/authServices/auth.module';
import { OfficeController } from './adminController/office.controller';
import { AdminModule } from '../services/adminServices/admin.module';
import { UserController } from './adminController/user.controller';
import { EngineerController } from './adminController/engineer.controler';
import { ClientController } from './adminController/client.controller';
import { EquipmentBrandController } from './adminController/equipmentBrand.controller';
import { WarrantyTypeController } from './adminController/warrantyType.controller';
import { PmsController } from './adminController/pms.controller';

@Module({
  imports: [AuthModule, AdminModule],
  controllers: [
    AuthController,
    OfficeController,
    UserController,
    EngineerController,
    ClientController,
    EquipmentBrandController,
    WarrantyTypeController,
    PmsController,
  ],
})
export class ControllerModule {}
