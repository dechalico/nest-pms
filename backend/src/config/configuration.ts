import { Config } from './interfaces';

export default (): Config => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_NAME,
  },
  jwt: {
    expires: process.env.JWT_EXPIRES,
    secretKey: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
  },
});
