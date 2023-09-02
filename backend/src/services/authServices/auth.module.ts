import { Module } from '@nestjs/common';
import { BaseServicesModule } from '../baseServices/baseServices.module';
import { JwtModule } from '@nestjs/jwt';
import { SecurityModule } from '../securityServices/sercurity.module';
import { AppConfigService } from '../../config/appConfig.service';
import { ICreateLoginTokenHandler } from './handlers/iCreateLoginTokenHandler';
import { CreateLoginToken } from './services/createLoginToken.service';
import { AuthGuard } from './services/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CurrentUser } from './services/currentUser.service';
import { ICurrentUserHandler } from './handlers/ICurrentUserHandler';
import { ValidateUserInviteHandler } from './services/validateUserInviteHandler';
import { IValidateUserInviteHandler } from './handlers/IValidateUserInviteHandler';

@Module({
  imports: [
    BaseServicesModule,
    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: async (configService: AppConfigService) => {
        const jwtConfig = configService.getJwtConfig();
        return {
          secret: jwtConfig.secretKey,
          verifyOptions: {
            issuer: jwtConfig.issuer,
          },
          signOptions: {
            expiresIn: jwtConfig.expires,
            issuer: jwtConfig.issuer,
          },
        };
      },
    }),
    SecurityModule,
  ],
  providers: [
    {
      provide: ICreateLoginTokenHandler,
      useClass: CreateLoginToken,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: ICurrentUserHandler,
      useClass: CurrentUser,
    },
    {
      provide: IValidateUserInviteHandler,
      useClass: ValidateUserInviteHandler,
    },
  ],
  exports: [
    ICreateLoginTokenHandler,
    ICurrentUserHandler,
    IValidateUserInviteHandler,
  ],
})
export class AuthModule {}
