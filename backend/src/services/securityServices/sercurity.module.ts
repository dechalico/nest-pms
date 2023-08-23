import { Module } from '@nestjs/common';
import { PasswordHasher } from './services/passwordService';
import { TokenService } from './services/tokenService';

@Module({
  providers: [PasswordHasher, TokenService],
  exports: [PasswordHasher, TokenService],
})
export class SecurityModule {}
