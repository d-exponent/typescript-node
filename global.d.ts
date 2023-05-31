namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    NODE_ENV: string;
    DB_PASSWORD: string;
    DB_USERNAME: string;
    DB: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
  }
}