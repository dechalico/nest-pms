import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AppConfigService } from '../../../config/appConfig.service';
import { Reflector } from '@nestjs/core';
import { IS_ALLOW_ANONYMOUS } from '../decorators/allowAnonymous';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAllowAnonymous = this.reflector.getAllAndOverride<boolean>(IS_ALLOW_ANONYMOUS, [
      context.getHandler(),
      context.getClass(),
    ]);

    // skip public routes
    if (isAllowAnonymous) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const jwtConfig = this.configService.getJwtConfig();
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConfig.secretKey,
        issuer: jwtConfig.issuer,
      });
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    const authCookie = request.cookies['auth'];
    return type === 'Bearer' ? token ?? authCookie : undefined;
  }
}
