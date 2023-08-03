import { BaseEntity } from '../entities';
import { Db, Collection, ObjectId } from 'mongodb';
import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { objectIdCreator } from '../helper';

export abstract class BaseRepositoryService<Entity extends BaseEntity> {
  protected readonly table: Collection;

  constructor(protected readonly db: Db, tableName: string) {
    this.db = db;
    this.table = db.collection(tableName);
  }

  async createAsync(entity: Entity): Promise<AppResult<Entity>> {
    try {
      const result = await this.table.insertOne(entity, {
        ignoreUndefined: false,
      });
      return AppResult.createSucceeded(entity, 'entity successfully created');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured when creating entity',
      );
    }
  }

  async getByIdAsync(id: string | ObjectId): Promise<AppResult<Entity>> {
    try {
      const objectId = objectIdCreator(id);
      const result = await this.table.findOne<Entity>({
        _id: objectId,
      });
      if (!result) {
        return AppResult.createFailed(
          new Error("can't find entity by id"),
          "can't find entity by id",
          AppErrorCodes.NotFound,
        );
      }
      return AppResult.createSucceeded(result, 'successfully get entity by id');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occure when getting the entity by id',
      );
    }
  }

  async updateAsync(entity: Partial<Entity>): Promise<AppResult<Entity>> {
    try {
      const { _id, ...rest } = entity;
      await this.table.findOneAndUpdate({ _id: _id }, { $set: { rest } });
      const updated = await this.table.findOne<Entity>({ _id: entity._id });
      return AppResult.createSucceeded(updated, 'entity successfully updated');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured when updating entity',
      );
    }
  }

  async getAllAsync(): Promise<AppResult<Array<Entity>>> {
    try {
      const cursor = this.table.find<Entity>({}, { sort: { _id: 1 } });
      const result: Array<Entity> = [];
      for await (const doc of cursor) {
        result.push(doc);
      }
      return AppResult.createSucceeded(result, 'successfully get all entities');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured when trying to get all entities',
      );
    }
  }

  async deleteAsync(id: string | ObjectId): Promise<AppResult<string>> {
    try {
      const objectId = objectIdCreator(id);
      await this.table.findOneAndDelete({ _id: objectId });
      return AppResult.createSucceeded(
        id.toString(),
        'successfully delete entity by id',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured when trying to delete entity',
      );
    }
  }
}
