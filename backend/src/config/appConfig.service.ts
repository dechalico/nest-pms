import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Database, Config, Jwt } from './interfaces';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}
  getConfig<TResult>(path: string): TResult {
    return this.configService.get<TResult>(path);
  }
  getDatabaseConfig(): Database {
    return this.configService.get<Database>('database');
  }
  getJwtConfig(): Jwt {
    return this.configService.get<Jwt>('jwt');
  }
}
