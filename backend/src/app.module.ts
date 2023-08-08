import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfig.module';
import { ServiceModules } from './services/services.module';
import { ControllerModule } from './controllers/controller.module';

@Module({
  imports: [AppConfigModule, ServiceModules, ControllerModule],
  providers: [],
})
export class AppModule {}
