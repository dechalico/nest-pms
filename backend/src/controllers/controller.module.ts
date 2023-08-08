import { Module } from '@nestjs/common';
import { AuthController } from './authController/auth.controller';
import { AuthModule } from '../services/authServices/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
})
export class ControllerModule {}
