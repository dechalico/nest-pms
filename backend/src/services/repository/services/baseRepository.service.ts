import { BaseEntity } from '../entities';
import { Db, Collection, ObjectId } from 'mongodb';
import { AppErrorCodes, AppResult } from '../../../common/app.result';
import { objectIdCreator } from '../helper';
import { instanceToPlain } from 'class-transformer';

export abstract class BaseRepositoryService<Entity extends BaseEntity> {
  protected readonly table: Collection;
  protected readonly Wrapper: new () => Entity;

  constructor(
    protected readonly db: Db,
    tableName: string,
    Wrapper: new () => Entity,
  ) {
    this.db = db;
    this.table = db.collection(tableName);
    this.Wrapper = Wrapper;
  }

  async createAsync(entity: Entity): Promise<AppResult<any>> {
    try {
      const { _id, ...rest } = entity;
      const result = await this.table.insertOne(rest, {
        ignoreUndefined: false,
      });
      entity._id = result.insertedId;
      const obj = new this.Wrapper();
      Object.assign(obj, entity);

      return AppResult.createSucceeded(
        instanceToPlain(obj, { excludeExtraneousValues: true }),
        'Entity successfully created.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when creating entity',
      );
    }
  }

  async getByIdAsync(id: string | ObjectId): Promise<AppResult<any>> {
    try {
      const objectId = objectIdCreator(id);
      const result = await this.table.findOne<Entity>({
        _id: objectId,
      });
      if (!result) {
        return AppResult.createFailed(
          new Error("Can't find entity by id."),
          "Can't find entity by id.",
          AppErrorCodes.NotFound,
        );
      }

      const obj = new this.Wrapper();
      Object.assign(obj, result);

      return AppResult.createSucceeded(
        instanceToPlain(obj, { excludeExtraneousValues: true }),
        'Successfully get entity by id.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when getting the entity by id.',
      );
    }
  }

  async updateAsync(entity: Partial<Entity>): Promise<AppResult<any>> {
    try {
      const { _id, ...rest } = entity;
      await this.table.findOneAndUpdate(
        { _id: objectIdCreator(_id) },
        { $set: { rest } },
      );
      const updated = await this.table.findOne<Entity>({
        _id: objectIdCreator(_id),
      });
      const obj = new this.Wrapper();
      Object.assign(obj, updated);

      return AppResult.createSucceeded(
        instanceToPlain(obj, { excludeExtraneousValues: true }),
        'Entity successfully updated.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when updating entity.',
      );
    }
  }

  async getAllAsync(): Promise<AppResult<any>> {
    try {
      const cursor = this.table.find<Entity>({}, { sort: { _id: 1 } });
      const result: Array<Entity> = [];
      for await (const doc of cursor) {
        const obj = new this.Wrapper();
        Object.assign(obj, doc);
        result.push(obj);
      }

      return AppResult.createSucceeded(
        instanceToPlain(result, { excludeExtraneousValues: true }),
        'Successfully get all entities.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when trying to get all entities.',
      );
    }
  }

  async deleteAsync(id: string | ObjectId): Promise<AppResult<string>> {
    try {
      const objectId = objectIdCreator(id);
      await this.table.findOneAndDelete({ _id: objectId });
      return AppResult.createSucceeded(
        id.toString(),
        'Successfully delete entity by id.',
      );
    } catch (error) {
      return AppResult.createFailed(
        error,
        'An error occured when trying to delete entity.',
      );
    }
  }
}
