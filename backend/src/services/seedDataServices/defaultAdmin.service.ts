import { IDefaultAdminHandler } from './handlers/iDefaultAdminHandler';
import {
  DefaultAdminArgs,
  DefaultAdminResult,
} from './interactors/defaultAdminInteractors';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from '../baseServices/services/user.service';
import { AppResult } from 'src/common/app.result';
import { PasswordHasher } from '../securityServices/services/passwordService';
import { plainToClass } from 'class-transformer';

@Injectable()
export class DefaultAdminService implements IDefaultAdminHandler, OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly passwordHasher: PasswordHasher,
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
        );
      }
      const users = checkUsers.Result;
      if (users.length > 0) {
        return AppResult.createFailed(
          new Error("already have registered user. can't create default user."),
          "already have registered user. can't create default user.",
        );
      }

      const hashedPasswordRes = await this.passwordHasher.hashPassword(
        args.password,
      );
      if (!hashedPasswordRes.Succeeded || !hashedPasswordRes.Result) {
        return AppResult.createFailed(
          new Error(hashedPasswordRes.Message),
          hashedPasswordRes.Message,
        );
      }

      const { password, ...rest } = args;
      const createRes = await this.userService.createUserAsync({
        ...rest,
        email: String.Empty,
        password: hashedPasswordRes.Result,
      });
      if (!createRes.Succeeded || !createRes.Result) {
        return AppResult.createFailed(
          new Error(createRes.Message),
          createRes.Message,
        );
      }
      const created = createRes.Result;
      const result = plainToClass(DefaultAdminResult, created);
      result.hashedPassword = created.password;

      return AppResult.createSucceeded(
        result,
        'successfully create default user',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured when trying to create default user',
      );
    }
  }
}
