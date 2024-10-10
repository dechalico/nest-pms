import { Inject, Injectable } from '@nestjs/common';
import { Warranty } from '../entities';
import { BaseRepositoryService } from './baseRepository.service';
import { Db, ObjectId } from 'mongodb';
import { AppResult } from 'src/common/app.result';
import { objectIdCreator } from '../helper';
import { GetAllArgs } from '../entities';

@Injectable()
export class WarrantyRepository extends BaseRepositoryService<Warranty> {
  constructor(@Inject('DATABASE_CONNECTION') db: Db) {
    super(db, 'warranties', Warranty);
  }

  createAsync(entity: Warranty): Promise<AppResult<any>> {
    if (entity.engineers_id) {
      entity.engineers_id = entity.engineers_id.map((i) => objectIdCreator(i));
    }
    return super.createAsync(entity);
  }

  updateAsync(entity: Partial<Warranty>): Promise<AppResult<any>> {
    if (entity.engineers_id) {
      entity.engineers_id = entity.engineers_id.map((i) => objectIdCreator(i));
    }
    return super.updateAsync(entity);
  }

  getAllAsync(args: WarrantyOptions = { filter: {} }): Promise<AppResult<any>> {
    const { id, ...filtered } = args.filter;
    const options: any = {
      filter: {
        ...filtered,
      },
      include: args.include,
    };
    if (args.filter?.id) {
      options.filter._id = {
        $in:
          args.filter.id instanceof Array
            ? args.filter.id.map((i) => objectIdCreator(i))
            : objectIdCreator(args.filter.id),
      };
    }

    return super.getAllAsync(options);
  }
}

class WarrantyOptions extends GetAllArgs {
  filter: {
    id?: string[] | string;
  };
}
