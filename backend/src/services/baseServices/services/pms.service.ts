import { Injectable } from '@nestjs/common';
import { PmsRepository } from '../../repository/services/pmsRepository.service';
import { CreatePms, PmsSchema } from '../schemas/pms.schema';
import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { ClientRepository } from '../../repository/services/clientRepository.service';
import { EquipmentBrandRepository } from '../../repository/services/equipmentBrandRepository.service';
import { EngineerRepository } from '../../repository/services/engineerRepository.service';

@Injectable()
export class PmsService {
  constructor(
    private readonly pmsRepository: PmsRepository,
    private readonly clientRepo: ClientRepository,
    private readonly equipmentBrandRepo: EquipmentBrandRepository,
    private readonly engineerRepo: EngineerRepository,
  ) {}

  async createPmsAync(args: CreatePms): Promise<AppResult<PmsSchema>> {
    try {
      const checkClientRes = await this.clientRepo.getByIdAsync(args.clientId);
      if (!checkClientRes.succeeded || !checkClientRes.result) {
        return AppResult.createFailed(
          new Error('Invalid client id.'),
          'Invalid client id.',
          AppErrorCodes.InvalidRequest,
        );
      }
      const client = checkClientRes.result;

      const checkEquipmentBrandRes = await this.equipmentBrandRepo.getByIdAsync(
        args.equipmentBrandId,
      );
      if (!checkEquipmentBrandRes.succeeded || !checkEquipmentBrandRes.result) {
        return AppResult.createFailed(
          new Error('Invalid equipment brand id.'),
          'Invalid equipment brand id.',
          AppErrorCodes.InvalidRequest,
        );
      }
      const equipmentBrand = checkEquipmentBrandRes.result;

      const checkEngineersRes = await this.engineerRepo.getAllAsync({
        filter: {
          _id: args.engineersId,
        },
      });
      if (
        !checkEngineersRes.succeeded ||
        !checkEngineersRes.result ||
        checkEngineersRes.result.length != args.engineersId.length
      ) {
        return AppResult.createFailed(
          new Error('Invalid engineer ids.'),
          'Invalid engineer ids.',
          AppErrorCodes.InvalidRequest,
        );
      }
      const engineers = checkEngineersRes.result;

      return this.pmsRepository.createAsync({
        _id: undefined,
        area_office_id: args.areaOfficeId,
        client: {
          _id: client.id,
          city: client.city,
          name: client.name,
        },
        date_created: new Date(),
        dateInstalled: args.dateInstalled,
        engineers: engineers.map((e) => ({
          _id: e.id,
          firstName: e.firstName,
          lastName: e.lastName,
          middleName: e.middleName,
        })),
        equipmentBrand: {
          _id: equipmentBrand.id,
          name: equipmentBrand.name,
        },
        fsrNumber: args.fsrNumber,
        model: args.model,
        remarks: args.remarks,
        serialNumbers: args.serialNumbers,
        status: args.status,
        date_updated: undefined,
      });
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating pms.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
