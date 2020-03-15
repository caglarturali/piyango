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
export const DATE_FORMAT = 'YYYYMMDD';

/**
 * API date format in hyphenated string.
 */
export const DATE_FORMAT_VIEW = 'DD-MM-YYYY';

/**
 * API date format in human-readable form.
 */
export const DATE_FORMAT_FRIENDLY = 'DD/MM/YYYY';

/**
 * Date format used for luckhistory endpoint.
 */
export const DATE_FORMAT_SHORT = 'MMDD';

/**
 * Format string for embeddable stream resources.
 */
export const DATE_FORMAT_EMBED = 'DD_MM_YYYY';

/**
 * Base path for static data.
 */
export const STATIC_DATA_PATH = path.join(__dirname, '..', 'draws');

/**
 * Stream urls for embed endpoint.
 */
export const STREAM_URL = {
  base: {
    url: 'http://mtvfcntomsvod.mediatriple.net',
    file: 'playlist.m3u8',
  },
  dummy: {
    url: 'http://devimages.apple.com/iphone/samples/bipbop',
    file: 'bipbopall.m3u8',
  },
};
