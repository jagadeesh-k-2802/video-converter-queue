declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RABBIT_MQ_URL: string;
      PORT?: number;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
