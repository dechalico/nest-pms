import { IDefaultAdminHandler } from './handlers/iDefaultAdminHandler';
import {
  DefaultAdminArgs,
  DefaultAdminResult,
} from './interactors/defaultAdminInteractors';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from '../baseServices/services/user.service';
import { AppResult } from 'src/common/app.result';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DefaultAdminService implements IDefaultAdminHandler, OnModuleInit {
  constructor(private readonly userService: UserService) {}

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
        );
      }
      const users = checkUsers.Result;
      if (users.length > 0) {
        return AppResult.createFailed(
          new Error(
            'Already have registered user. Unable to create default user.',
          ),
          'Already have registered user. Unable to create default user.',
        );
      }

      const createRes = await this.userService.createUserAsync({
        ...args,
        email: String.Empty,
      });
      if (!createRes.Succeeded || !createRes.Result) {
        return AppResult.createFailed(
          new Error(createRes.Message),
          createRes.Message,
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
      );
    }
  }
}
