import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { UserService } from './services/user.service';

@Module({
  imports: [RepositoryModule],
  providers: [UserService],
  exports: [UserService],
})
export class BaseServicesModule {}
