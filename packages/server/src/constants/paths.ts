import path from 'path';

/**
 * Base path for static data.
 */
export const STATIC_DATA_PATH = path.join(__dirname, '..', '..', 'static');

/**
 * The path of static draw data.
 */
export const DRAWS_DIR_PATH = path.join(__dirname, '..', 'db', 'draws');

/**
 * The path of static "statistics" data.
 */
export const STATS_DIR_PATH = path.join(STATIC_DATA_PATH, 'stats');
