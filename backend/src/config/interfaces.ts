export interface Database {
  host: string;
  port: number;
  username: string;
  password: string;
  dbName: string;
}

export interface Jwt {
  secretKey: string;
  expires: string;
  issuer: string;
}

export interface Config {
  port: number;
  database: Database;
  jwt: Jwt;
}
