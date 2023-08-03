import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfig.module';
import { ServiceModules } from './services/services.module';

@Module({
  imports: [AppConfigModule, ServiceModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
