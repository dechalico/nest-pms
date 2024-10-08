import { IDefaultAdminHandler } from './handlers/iDefaultAdminHandler';
import { DefaultAdminArgs, DefaultAdminResult } from './interactors/defaultAdminInteractors';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from '../baseServices/services/user.service';
import { AreaOfficeService } from '../baseServices/services/areaOffice.service';
import { AppErrorCodes, AppResult } from '../../common/app.result';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DefaultAdminService implements IDefaultAdminHandler, OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly areaOfficeService: AreaOfficeService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.executeAsync({
      firstName: 'admin',
      lastName: 'admin',
      password: 'admin',
      roles: [],
      username: 'admin',
    });
  }

  async executeAsync(args: DefaultAdminArgs): Promise<AppResult<DefaultAdminResult>> {
    try {
      const checkUsers = await this.userService.getAllUsers({ limit: 10, skip: 0 });
      if (!checkUsers.succeeded || !checkUsers.result) {
        return AppResult.createFailed(
          new Error(checkUsers.message),
          checkUsers.message,
          checkUsers.error.code,
        );
      }
      const users = checkUsers.result;
      if (users.length > 0) {
        return AppResult.createFailed(
          new Error('Already have registered user. Unable to create default user.'),
          'Already have registered user. Unable to create default user.',
          AppErrorCodes.InternalError,
        );
      }

      // create default area office
      let areaOfficeId: string = undefined;
      const getAllAreaRes = await this.areaOfficeService.getAllAreaOffices({
        limit: 50,
        skip: 0,
      });
      if (!getAllAreaRes.succeeded || !getAllAreaRes.result) {
        return AppResult.createFailed(
          new Error(getAllAreaRes.message),
          getAllAreaRes.message,
          getAllAreaRes.error.code,
        );
      }
      if (getAllAreaRes.result.length === 0) {
        const createAreaRes = await this.areaOfficeService.createAreaOfficeAsync({
          city: 'Davao City',
          name: 'MinOne',
        });
        if (!createAreaRes.succeeded || !createAreaRes.result) {
          return AppResult.createFailed(
            new Error(createAreaRes.message),
            createAreaRes.message,
            createAreaRes.error.code,
          );
        }
        areaOfficeId = createAreaRes.result.id;
      } else {
        areaOfficeId = getAllAreaRes.result[0].id;
      }

      const createRes = await this.userService.createUserAsync({
        ...args,
        email: String.Empty,
        areaOfficeId: areaOfficeId,
      });
      if (!createRes.succeeded || !createRes.result) {
        return AppResult.createFailed(
          new Error(createRes.message),
          createRes.message,
          createRes.error.code,
        );
      }
      const created = createRes.result;
      const result = plainToInstance(DefaultAdminResult, created, {
        excludeExtraneousValues: true,
      });
      result.hashedPassword = created.password;

      return AppResult.createSucceeded(result, 'Default user successfully created.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when trying to create default user.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
