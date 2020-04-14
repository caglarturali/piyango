export const app: {
  baseUrl: string;
  apiUrl: { [key in NodeJS.ProcessEnv['NODE_ENV']]: string };
  videoProxy: { [key in NodeJS.ProcessEnv['NODE_ENV']]: string };
} = {
  baseUrl: 'https://piyango.online',
  apiUrl: {
    production: 'https://dev.piyango.online/api',
    development: 'http://localhost:5000/api',
    test: 'http://localhost:5000/api',
  },
  videoProxy: {
    production: 'https://netnr-proxy.cloudno.de/',
    development: '',
    test: '',
  },
};
