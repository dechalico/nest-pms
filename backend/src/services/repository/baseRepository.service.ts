import { BaseEntity } from './entities';
import { Db, Collection, ObjectId } from 'mongodb';
import { AppResult } from '../../common/app.result';

export abstract class BaseRepositoryService<Entity extends BaseEntity> {
  protected readonly table: Collection;

  constructor(protected readonly db: Db, tableName: string) {
    this.table = db.collection(tableName);
  }

  async createAsync(entity: Entity): Promise<AppResult<Entity>> {
    try {
      const result = await this.table.insertOne(entity, {
        ignoreUndefined: false,
      });
      entity.id = result.insertedId.toString();
      return AppResult.createSucceeded(entity, 'entity successfully created');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured when creating entity',
      );
    }
  }

  async getByIdAsync(id: string): Promise<AppResult<Entity>> {
    try {
      const result = await this.table.findOne<Entity>({
        _id: new ObjectId(id),
      });
      return AppResult.createSucceeded(result, 'successfully get entity by id');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occure when getting the entity by id',
      );
    }
  }

  async updateAsync(entity: Entity): Promise<AppResult<Entity>> {
    try {
      const { id, ...rest } = entity;
      await this.table.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { rest } },
      );

      return AppResult.createSucceeded(entity, 'entity successfully updated');
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

  async deleteAsync(id: string): Promise<AppResult<string>> {
    try {
      await this.table.findOneAndDelete({ _id: new ObjectId(id) });
      return AppResult.createSucceeded(id, 'successfully delete entity by id');
    } catch (error) {
      return AppResult.createFailed(
        error,
        'an error occured when trying to delete entity',
      );
    }
  }
}
