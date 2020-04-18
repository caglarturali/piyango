/**
 * Base url of the production server.
 */
import { app } from '../configs';

const { production, development } = app.apiUrl;

export const API_BASE =
  process.env.NODE_ENV === 'production' ? production : development;
