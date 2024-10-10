import { Module } from '@nestjs/common';
import { AppConfigService } from '../../config/appConfig.service';
import { MongoClient, Db } from 'mongodb';
import repositoryServices from './services/index';
import { createIndexes } from './helper';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (config: AppConfigService): Promise<Db> => {
        try {
          const databaseConfig = config.getDatabaseConfig();
          const mongoUrl = `mongodb://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/?authSource=admin`;
          const client = await MongoClient.connect(mongoUrl);
          const database = client.db(databaseConfig.dbName);

          await createIndexes(database);

          return database;
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
    repositoryServices.WarrantyHistoryRepository,
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
    repositoryServices.WarrantyHistoryRepository,
  ],
})
export class RepositoryModule {}
