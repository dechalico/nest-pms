import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/services/userRepository.service';
import { UserSchema, CreateUser, UpdateUser } from '../schemas/user.schema';
import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { PasswordHasher } from '../../securityServices/services/passwordService';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async createUserAsync(user: CreateUser): Promise<AppResult<UserSchema>> {
    try {
      // lowercase username
      user.username = user.username.toLowerCase();

      const checkUser = await this.userRepository.getByUsernameAsync(user.username);

      if (checkUser.succeeded) {
        return AppResult.createFailed(
          new Error('Username already in used.'),
          'Username already in used.',
          AppErrorCodes.InvalidRequest,
        );
      }

      if (!checkUser.succeeded && checkUser.error.code !== AppErrorCodes.NotFound) {
        return AppResult.createFailed(
          new Error(checkUser.message),
          checkUser.message,
          checkUser.error.code,
        );
      }

      const hashedPasswordRes = await this.passwordHasher.hashPassword(user.password);
      if (!hashedPasswordRes.succeeded || !hashedPasswordRes.result) {
        return AppResult.createFailed(
          new Error(hashedPasswordRes.message),
          hashedPasswordRes.message,
          AppErrorCodes.InternalError,
        );
      }
      user.password = hashedPasswordRes.result;

      const now = new Date();
      const createdRes = await this.userRepository.createAsync({
        _id: undefined,
        date_created: now,
        date_updated: undefined,
        area_office_id: user.areaOfficeId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        roles: user.roles,
        username: user.username,
      });

      if (!createdRes.succeeded || !createdRes.result) {
        return AppResult.createFailed(
          new Error(createdRes.message),
          createdRes.message,
          createdRes.error.code,
        );
      }

      const userSchema: UserSchema = createdRes.result;
      return AppResult.createSucceeded(userSchema, 'User successfully created.');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating user',
        AppErrorCodes.InternalError,
      );
    }
  }

  async getUserByUsernameAsync(username: string): Promise<AppResult<UserSchema>> {
    try {
      const getUserRes = await this.userRepository.getByUsernameAsync(username);

      if (!getUserRes.succeeded && getUserRes.error.code === AppErrorCodes.NotFound) {
        return AppResult.createFailed(
          new Error("Can't find user by username."),
          "Can't find user by username.",
          AppErrorCodes.NotFound,
        );
      }

      if (!getUserRes.succeeded || !getUserRes.result) {
        return AppResult.createFailed(
          new Error(getUserRes.message),
          getUserRes.message,
          getUserRes.error.code,
        );
      }

      const userSchema: UserSchema = getUserRes.result;
      return AppResult.createSucceeded(userSchema, 'Successfully get user by username');
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

      if (!getUserRes.succeeded && getUserRes.error.code === AppErrorCodes.NotFound) {
        return AppResult.createFailed(
          new Error("Can't find user by user id."),
          "Can't find user by user id.",
          AppErrorCodes.NotFound,
        );
      }

      if (!getUserRes.succeeded || !getUserRes.result) {
        return AppResult.createFailed(
          new Error(getUserRes.message),
          getUserRes.message,
          getUserRes.error.code,
        );
      }

      const userSchema: UserSchema = getUserRes.result;
      return AppResult.createSucceeded(userSchema, 'Successfully get user by user id');
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
      const checkUserRes = await this.userRepository.getByIdAsync(user.id);
      if (!checkUserRes.succeeded || !checkUserRes.result) {
        return AppResult.createFailed(
          new Error(checkUserRes.message),
          checkUserRes.message,
          checkUserRes.error.code,
        );
      }

      const now = new Date();
      const updateRes = await this.userRepository.updateAsync({
        _id: user.id,
        date_updated: now,
        area_office_id: user.areaOfficeId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        roles: user.roles,
        username: user.username,
      });

      if (!updateRes.succeeded || !updateRes.result) {
        return AppResult.createFailed(
          new Error(updateRes.message),
          updateRes.message,
          updateRes.error.code,
        );
      }

      const userSchema: UserSchema = updateRes.result;
      return AppResult.createSucceeded(userSchema, 'User successfully updated.');
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
      if (!usersRes.succeeded || !usersRes.result) {
        return AppResult.createFailed(
          new Error(usersRes.message),
          usersRes.message,
          usersRes.error.code,
        );
      }
      const userSchema: Array<UserSchema> = usersRes.result;
      return AppResult.createSucceeded(userSchema, 'Successfully get all users');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting all users',
        AppErrorCodes.InternalError,
      );
    }
  }
}
