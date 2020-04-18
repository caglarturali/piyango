export type EnvKeys = 'development' | 'production' | 'test';

export const app: {
  baseUrl: string;
  apiUrl: { [key in EnvKeys]: string };
} = {
  baseUrl: 'https://piyango.online',
  apiUrl: {
    production: 'https://dev.piyango.online/api',
    development: 'http://localhost:5000/api',
    test: 'http://localhost:5000/api',
  },
};
