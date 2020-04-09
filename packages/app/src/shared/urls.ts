/**
 * Base url of the production server.
 */
import { app } from '../configs';

export const API_BASE =
  process.env.NODE_ENV === 'production'
    ? app.apiUrl.production
    : app.apiUrl.development;
