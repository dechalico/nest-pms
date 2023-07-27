import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/appConfig.module';
import { RepositoryModule } from './services/repository/repository.module';

@Module({
  imports: [AppConfigModule, RepositoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
