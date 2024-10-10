import { ObjectId, Db } from 'mongodb';

export function objectIdCreator(id?: any): undefined | ObjectId {
  if (!id) return undefined;
  if (typeof id === 'string') return new ObjectId(id);
  if (id instanceof ObjectId) return id;
  throw new Error('id not supported');
}

export async function createIndexes(db: Db): Promise<void> {
  // for clients collection indexes
  await db.collection('clients').createIndex({ name: 1 });

  // for principal collection indexes
  await db.collection('equipment_brands').createIndex({ name: 1 });

  // for warranty types collection indexes
  await db.collection('warranty_types').createIndex({ name: 1 });

  // for pms collection indexes
  await db.collection('pms').createIndex({ serialNumbers: 1 });
  await db.collection('pms').createIndex({ fsrNumber: 1 });
  await db.collection('pms').createIndex({ model: 1 });
  await db.collection('pms').createIndex({ 'client.name': 1 });
  await db.collection('pms').createIndex({ 'equipmentBrand.name': 1 });

  // for offices collection indexes
  await db.collection('area_offices').createIndex({ name: 1 });

  // for users collection indexes
  await db.collection('users').createIndex({ email: 1 });
  await db.collection('users').createIndex({ username: 1 });
  await db.collection('users').createIndex({ firstName: 1, lastName: 1 });

  // for engineers collection indexes
  await db.collection('engineers').createIndex({ lastName: 1, firstName: 1, middleName: 1 });
}
