import { Module } from '@nestjs/common';
import { BaseServicesModule } from '../baseServices/baseServices.module';
import { JwtModule } from '@nestjs/jwt';
import { SecurityModule } from '../securityServices/sercurity.module';
import { AppConfigModule } from '../../config/appConfig.module';
import { AppConfigService } from '../../config/appConfig.service';
import { ICreateLoginTokenHandler } from './handlers/iCreateLoginTokenHandler';
import { CreateLoginToken } from './services/createLoginToken.service';
import { AuthGuard } from './services/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    BaseServicesModule,
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
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
  ],
  exports: [ICreateLoginTokenHandler],
})
export class AuthModule {}
