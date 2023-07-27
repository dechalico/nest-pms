export interface Database {
  host: string;
  port: number;
  username: string;
  password: string;
  dbName: string;
}

export interface Config {
  port: number;
  database: Database;
}
