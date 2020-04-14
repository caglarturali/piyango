/**
 * Base url of the production server.
 */
import { app } from '../configs';

export const API_BASE = app.apiUrl[process.env.NODE_ENV];
