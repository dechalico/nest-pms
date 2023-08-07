import { Module } from '@nestjs/common';
import { BaseServicesModule } from '../baseServices/baseServices.module';
import { JwtModule } from '@nestjs/jwt';
import { SecurityModule } from '../securityServices/sercurity.module';
import { AppConfigModule } from '../../config/appConfig.module';
import { AppConfigService } from '../../config/appConfig.service';
import { ICreateLoginTokenHandler } from './handlers/iCreateLoginTokenHandler';
import { CreateLoginToken } from './services/createLoginToken.service';

@Module({
  imports: [
    BaseServicesModule,
    AppConfigModule,
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
  ],
  exports: [ICreateLoginTokenHandler],
})
export class AuthModule {}
