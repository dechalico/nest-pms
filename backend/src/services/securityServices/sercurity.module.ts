import { Module } from '@nestjs/common';
import { PasswordHasher } from './services/passwordService';

@Module({
  providers: [PasswordHasher],
  exports: [PasswordHasher],
})
export class SecurityModule {}
