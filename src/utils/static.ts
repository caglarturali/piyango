import path from 'path';
import { STATIC_DATA_PATH } from '../constants';

/**
 * Builds static resource path for given draw.
 * @param {String} gameId Game ID
 * @param {String} drawDate Draw date
 * @returns {String} Resource path
 */
export const buildStaticResourcePath = (
  gameId: string,
  drawDate: string,
): string => {
  const resourceName = `${drawDate}.json`;
  return path.join(STATIC_DATA_PATH, gameId, resourceName);
};
