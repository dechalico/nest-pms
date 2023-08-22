import { IDefaultAdminHandler } from './handlers/iDefaultAdminHandler';
import {
  DefaultAdminArgs,
  DefaultAdminResult,
} from './interactors/defaultAdminInteractors';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from '../baseServices/services/user.service';
import { AreaOfficeService } from '../baseServices/services/areaOffice.service';
import { AppErrorCodes, AppResult } from 'src/common/app.result';
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

  async executeAsync(
    args: DefaultAdminArgs,
  ): Promise<AppResult<DefaultAdminResult>> {
    try {
      const checkUsers = await this.userService.getAllUsers();
      if (!checkUsers.Succeeded || !checkUsers.Result) {
        return AppResult.createFailed(
          new Error(checkUsers.Message),
          checkUsers.Message,
          checkUsers.Error.code,
        );
      }
      const users = checkUsers.Result;
      if (users.length > 0) {
        return AppResult.createFailed(
          new Error(
            'Already have registered user. Unable to create default user.',
          ),
          'Already have registered user. Unable to create default user.',
          AppErrorCodes.InternalError,
        );
      }

      // create default area office
      let areaOfficeId: string = undefined;
      const getAllAreaRes = await this.areaOfficeService.getAllAreaOffices();
      if (!getAllAreaRes.Succeeded || !getAllAreaRes.Result) {
        return AppResult.createFailed(
          new Error(getAllAreaRes.Message),
          getAllAreaRes.Message,
          getAllAreaRes.Error.code,
        );
      }
      if (getAllAreaRes.Result.length === 0) {
        const createAreaRes =
          await this.areaOfficeService.createAreaOfficeAsync({
            city: 'Davao City',
            name: 'MinOne',
          });
        if (!createAreaRes.Succeeded || !createAreaRes.Result) {
          return AppResult.createFailed(
            new Error(createAreaRes.Message),
            createAreaRes.Message,
            createAreaRes.Error.code,
          );
        }
        areaOfficeId = createAreaRes.Result.id;
      } else {
        areaOfficeId = getAllAreaRes.Result[0].id;
      }

      const createRes = await this.userService.createUserAsync({
        ...args,
        email: String.Empty,
        areaOfficeId: areaOfficeId,
      });
      if (!createRes.Succeeded || !createRes.Result) {
        return AppResult.createFailed(
          new Error(createRes.Message),
          createRes.Message,
          createRes.Error.code,
        );
      }
      const created = createRes.Result;
      const result = plainToInstance(DefaultAdminResult, created, {
        excludeExtraneousValues: true,
      });
      result.hashedPassword = created.password;

      return AppResult.createSucceeded(
        result,
        'Default user successfully created.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when trying to create default user.',
        AppErrorCodes.InternalError,
      );
    }
  }
}
