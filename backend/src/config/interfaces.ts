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

export interface Cookie {
  secret: string;
}

export interface Config {
  port: number;
  frontendUrl: string;
  database: Database;
  jwt: Jwt;
  cookie: Cookie;
}
