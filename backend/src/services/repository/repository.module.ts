import { Module } from '@nestjs/common';
import { AppConfigService } from '../../config/appConfig.service';
import { MongoClient, Db } from 'mongodb';
import repositoryServices from './services/index';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (config: AppConfigService): Promise<Db> => {
        try {
          const databaseConfig = config.getDatabaseConfig();
          const mongoUrl = `mongodb://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/?authSource=admin`;
          const client = await MongoClient.connect(mongoUrl);
          return client.db(databaseConfig.dbName);
        } catch (error) {
          throw error;
        }
      },
      inject: [AppConfigService],
    },
    repositoryServices.AreaOfficeRepository,
    repositoryServices.ClientRepository,
    repositoryServices.EngineerRepository,
    repositoryServices.EquipmentBrandRepository,
    repositoryServices.UserRepository,
    repositoryServices.WarrantyTypeRepository,
    repositoryServices.PmsRepository,
    repositoryServices.InvitedTokenRepository,
    repositoryServices.WarrantyRepository,
  ],
  exports: [
    repositoryServices.AreaOfficeRepository,
    repositoryServices.ClientRepository,
    repositoryServices.EngineerRepository,
    repositoryServices.EquipmentBrandRepository,
    repositoryServices.UserRepository,
    repositoryServices.WarrantyTypeRepository,
    repositoryServices.PmsRepository,
    repositoryServices.InvitedTokenRepository,
    repositoryServices.WarrantyRepository,
  ],
})
export class RepositoryModule {}
