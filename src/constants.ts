import path from 'path';

/**
 * Base url for MPI web service.
 */
export const MPI_BASE = 'http://www.millipiyango.gov.tr/sonuclar';

/**
 * Games constants.
 */
export const GAMES = [
  'sayisal',
  'sanstopu',
  'onnumara',
  'superloto',
  'piyango',
];

/**
 * API date format.
 */
export const API_DATE_FORMAT = 'YYYYMMDD';

/**
 * Base path for static data.
 */
export const STATIC_DATA_PATH = path.join(__dirname, '..', 'data');
