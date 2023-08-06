import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserRepository } from '../../repository/services/userRepository.service';
import { UserSchema, CreateUserSchema } from '../schemas/user.schema';
import { AppErrorCodes, AppResult } from 'src/common/app.result';
import { User } from 'src/services/repository/entities';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUserAsync(
    user: CreateUserSchema,
  ): Promise<AppResult<UserSchema>> {
    try {
      const checkUser = await this.userRepository.getByUsernameAsync(
        user.username,
      );

      if (checkUser.Succeeded) {
        return AppResult.createFailed(
          new Error('username already in use.'),
          'username already in use.',
          AppErrorCodes.InvalidRequest,
        );
      }

      if (
        !checkUser.Succeeded &&
        checkUser.Error.code !== AppErrorCodes.NotFound
      ) {
        return AppResult.createFailed(
          new Error(checkUser.Message),
          checkUser.Message,
        );
      }

      const now = new Date();
      const createdRes = await this.userRepository.createAsync({
        _id: undefined,
        ...user,
        date_created: now,
        date_updated: now,
      });

      if (!createdRes.Succeeded || !createdRes.Result) {
        return AppResult.createFailed(
          new Error(createdRes.Message),
          createdRes.Message,
        );
      }

      const result = plainToClass(UserSchema, createdRes.Result);
      return AppResult.createSucceeded(result, 'user successfully created.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured when creating user',
      );
    }
  }

  async getUserByUsernameAsync(
    username: string,
  ): Promise<AppResult<UserSchema>> {
    try {
      const getUserRes = await this.userRepository.getByUsernameAsync(username);

      if (
        !getUserRes.Succeeded &&
        getUserRes.Error.code === AppErrorCodes.NotFound
      ) {
        return AppResult.createFailed(
          new Error("can't find user by username."),
          "can't find user by username",
          AppErrorCodes.NotFound,
        );
      }

      if (!getUserRes.Succeeded || !getUserRes.Result) {
        return AppResult.createFailed(
          new Error(getUserRes.Message),
          getUserRes.Message,
        );
      }

      const result = plainToClass(UserSchema, getUserRes.Result);
      return AppResult.createSucceeded(
        result,
        'successfully get user by username',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured when getting user by username',
      );
    }
  }

  async getUserByIdAsync(id: string): Promise<AppResult<UserSchema>> {
    try {
      const getUserRes = await this.userRepository.getByIdAsync(id);

      if (
        !getUserRes.Succeeded &&
        getUserRes.Error.code === AppErrorCodes.NotFound
      ) {
        return AppResult.createFailed(
          new Error("can't find user by user id."),
          "can't find user by user id.",
          AppErrorCodes.NotFound,
        );
      }

      if (!getUserRes.Succeeded || !getUserRes.Result) {
        return AppResult.createFailed(
          new Error(getUserRes.Message),
          getUserRes.Message,
        );
      }

      const result = plainToClass(UserSchema, getUserRes.Result);
      return AppResult.createSucceeded(
        result,
        'successfully get user by user id',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured when getting user by user id',
      );
    }
  }

  async updateUserAsync(
    user: Partial<UserSchema>,
  ): Promise<AppResult<UserSchema>> {
    try {
      const { id } = user;
      const checkUserRes = await this.userRepository.getByIdAsync(id);
      if (!checkUserRes.Succeeded || !checkUserRes.Result) {
        return AppResult.createFailed(
          new Error(checkUserRes.Message),
          checkUserRes.Message,
          checkUserRes.Error.code,
        );
      }

      const objToUpdate = plainToClass(User, user);
      objToUpdate.date_updated = new Date();
      const updateRes = await this.userRepository.updateAsync(objToUpdate);

      if (!updateRes.Succeeded || !updateRes.Result) {
        return AppResult.createFailed(
          new Error(updateRes.Message),
          updateRes.Message,
          updateRes.Error.code,
        );
      }

      const result = plainToClass(UserSchema, updateRes.Result);
      return AppResult.createSucceeded(result, 'user successfully updated.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured when trying to update the user',
      );
    }
  }

  async getAllUsers(): Promise<AppResult<Array<UserSchema>>> {
    try {
      const usersRes = await this.userRepository.getAllAsync();
      if (!usersRes.Succeeded || !usersRes.Result) {
        return AppResult.createFailed(
          new Error(usersRes.Message),
          usersRes.Message,
        );
      }
      const transformedUsers = plainToClass(Array<UserSchema>, usersRes);
      return AppResult.createSucceeded(
        transformedUsers,
        'successfully get all users',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured when getting all users',
      );
    }
  }
}
