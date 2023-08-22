import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/services/userRepository.service';
import { UserSchema, CreateUser, UpdateUser } from '../schemas/user.schema';
import { AppErrorCodes, AppResult } from 'src/common/app.result';
import { PasswordHasher } from '../../securityServices/services/passwordService';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async createUserAsync(user: CreateUser): Promise<AppResult<UserSchema>> {
    try {
      const checkUser = await this.userRepository.getByUsernameAsync(
        user.username,
      );

      if (checkUser.Succeeded) {
        return AppResult.createFailed(
          new Error('Username already in used.'),
          'Username already in used.',
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
          checkUser.Error.code,
        );
      }

      const hashedPasswordRes = await this.passwordHasher.hashPassword(
        user.password,
      );
      if (!hashedPasswordRes.Succeeded || !hashedPasswordRes.Result) {
        return AppResult.createFailed(
          new Error(hashedPasswordRes.Message),
          hashedPasswordRes.Message,
          AppErrorCodes.InternalError,
        );
      }
      user.password = hashedPasswordRes.Result;

      const now = new Date();
      const { areaOfficeId, ...rest } = user;
      const createdRes = await this.userRepository.createAsync({
        ...rest,
        _id: undefined,
        date_created: now,
        date_updated: undefined,
        area_office_id: areaOfficeId,
      });

      if (!createdRes.Succeeded || !createdRes.Result) {
        return AppResult.createFailed(
          new Error(createdRes.Message),
          createdRes.Message,
          createdRes.Error.code,
        );
      }

      const userSchema: UserSchema = createdRes.Result;
      return AppResult.createSucceeded(
        userSchema,
        'User successfully created.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating user',
        AppErrorCodes.InternalError,
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
          new Error("Can't find user by username."),
          "Can't find user by username.",
          AppErrorCodes.NotFound,
        );
      }

      if (!getUserRes.Succeeded || !getUserRes.Result) {
        return AppResult.createFailed(
          new Error(getUserRes.Message),
          getUserRes.Message,
          getUserRes.Error.code,
        );
      }

      const userSchema: UserSchema = getUserRes.Result;
      return AppResult.createSucceeded(
        userSchema,
        'Successfully get user by username',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting user by username',
        AppErrorCodes.InternalError,
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
          new Error("Can't find user by user id."),
          "Can't find user by user id.",
          AppErrorCodes.NotFound,
        );
      }

      if (!getUserRes.Succeeded || !getUserRes.Result) {
        return AppResult.createFailed(
          new Error(getUserRes.Message),
          getUserRes.Message,
          getUserRes.Error.code,
        );
      }

      const userSchema: UserSchema = getUserRes.Result;
      return AppResult.createSucceeded(
        userSchema,
        'Successfully get user by user id',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting user by user id',
        AppErrorCodes.InternalError,
      );
    }
  }

  async updateUserAsync(user: UpdateUser): Promise<AppResult<UserSchema>> {
    try {
      const { id, ...rest } = user;
      const checkUserRes = await this.userRepository.getByIdAsync(id);
      if (!checkUserRes.Succeeded || !checkUserRes.Result) {
        return AppResult.createFailed(
          new Error(checkUserRes.Message),
          checkUserRes.Message,
          checkUserRes.Error.code,
        );
      }

      const now = new Date();
      const updateRes = await this.userRepository.updateAsync({
        ...rest,
        _id: id,
        date_updated: now,
      });

      if (!updateRes.Succeeded || !updateRes.Result) {
        return AppResult.createFailed(
          new Error(updateRes.Message),
          updateRes.Message,
          updateRes.Error.code,
        );
      }

      const userSchema: UserSchema = updateRes.Result;
      return AppResult.createSucceeded(
        userSchema,
        'User successfully updated.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when trying to update the user',
        AppErrorCodes.InternalError,
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
          usersRes.Error.code,
        );
      }
      const userSchema: Array<UserSchema> = usersRes.Result;
      return AppResult.createSucceeded(
        userSchema,
        'Successfully get all users',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting all users',
        AppErrorCodes.InternalError,
      );
    }
  }
}
