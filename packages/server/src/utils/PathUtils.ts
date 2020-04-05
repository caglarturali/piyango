import path from 'path';
import { GameID } from '@caglarturali/piyango-common';
import { DRAWS_DIR_PATH, STATS_DIR_PATH } from '../constants';

export class PathUtils {
  /**
   * Builds static resource path for given draw.
   * @param gameId Game ID
   * @param drawDate Draw date
   */
  static drawResourcePath(gameId: GameID, drawDate: string): string {
    const resourceName = `${drawDate}.json`;
    return path.join(DRAWS_DIR_PATH, gameId, resourceName);
  }

  /**
   * Builds "statistics" resource path for given game.
   * @param gameId Game ID
   */
  static statsResourcePath(gameId: GameID): string {
    const resourceName = `${gameId}.json`;
    return path.join(STATS_DIR_PATH, resourceName);
  }
}
