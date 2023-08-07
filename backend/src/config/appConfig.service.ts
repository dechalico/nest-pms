import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Database, Config, Jwt } from './interfaces';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}
  getConfig(): Config {
    return this.configService.get<Config>('');
  }
  getDatabaseConfig(): Database {
    return this.configService.get<Database>('database');
  }
  getJwtConfig(): Jwt {
    return this.configService.get<Jwt>('jwt');
  }
}
