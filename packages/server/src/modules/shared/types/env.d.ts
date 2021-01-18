declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    FRONTEND_HOST: string;
  }
}
