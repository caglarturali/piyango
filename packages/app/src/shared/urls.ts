import { app } from '../configs';

/**
 * Base url of the production server.
 */
export const API_BASE =
  process.env.NODE_ENV === 'production'
    ? app.apiUrl.production
    : app.apiUrl.development;
