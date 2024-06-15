import { BaseRepositoryService } from './baseRepository.service';
import { GetAllArgs, Pms } from '../entities';
import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { objectIdCreator } from '../helper';

@Injectable()
export class PmsRepository extends BaseRepositoryService<Pms> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'pms', Pms);
  }

  createAsync(entity: Pms): Promise<AppResult<any>> {
    entity.client._id = objectIdCreator(entity.client._id);
    entity.equipmentBrand._id = objectIdCreator(entity.equipmentBrand._id);
    entity.engineers.forEach((e) => (e._id = objectIdCreator(e._id)));
    return super.createAsync({
      _id: undefined,
      area_office_id: objectIdCreator(entity.area_office_id),
      client: entity.client,
      date_created: entity.date_created,
      date_updated: entity.date_updated,
      dateInstalled: entity.dateInstalled,
      engineers: entity.engineers,
      equipmentBrand: entity.equipmentBrand,
      fsrNumber: entity.fsrNumber,
      model: entity.model,
      remarks: entity.remarks,
      serialNumbers: entity.serialNumbers,
      status: entity.status,
    });
  }

  getAllAsync(args?: GetAllArgs): Promise<AppResult<any>> {
    const filter: Record<string, any> = {};
    if (args?.filter?.areaOfficeId) {
      filter.area_office_id = objectIdCreator(args?.filter?.areaOfficeId);
    }

    return super.getAllAsync(filter);
  }
}
