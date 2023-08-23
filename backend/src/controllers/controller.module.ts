import { Module } from '@nestjs/common';
import { AuthController } from './authController/auth.controller';
import { AuthModule } from '../services/authServices/auth.module';
import { OfficeController } from './adminController/office.controller';
import { AdminModule } from '../services/adminServices/admin.module';
import { UserController } from './adminController/user.controller';

@Module({
  imports: [AuthModule, AdminModule],
  controllers: [AuthController, OfficeController, UserController],
})
export class ControllerModule {}
