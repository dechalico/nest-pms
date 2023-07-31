import { ObjectId } from 'mongodb';

export function objectIdCreator(id?: any): undefined | ObjectId {
  if (!id) return undefined;
  if (typeof id === 'string') return new ObjectId(id);
  if (id instanceof ObjectId) return id;
  throw new Error('id not supported');
}
