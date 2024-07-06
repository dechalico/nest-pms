import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import Configuration from './configuration';
import { AppConfigService } from './appConfig.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [Configuration], envFilePath: ['.env', '.env.local'] })],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
