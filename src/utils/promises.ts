import fs from 'fs';
import { GameID } from '../models/Game';
import { SortOrder } from '../models/SortOrder';
import { getDrawDates, getDrawDetails } from '../controllers';
import { buildStaticResourcePath } from './static';
import apiconfig from '../apiconfig';

export interface DrawDatesPromise {
  gameId: GameID;
  drawDates: string[] | null | undefined;
  error: string | null;
}

export interface DrawDetailsPromise {
  gameId: GameID;
  drawDate: string;
  drawDetails: any;
  error: string | null;
}

/**
 * Fetches draw dates for given game.
 * @param {GameID} gameId Game ID
 * @returns {Promise<Object>} Draw dates promise
 */
export const getDrawDatesPromise = (
  gameId: GameID,
): Promise<DrawDatesPromise> => {
  const { limit, skip } = apiconfig.drawdates;

  return new Promise((resolve, reject) => {
    getDrawDates(gameId, limit, skip, SortOrder.DESC)
      .then((response) => {
        if (response.error) {
          throw new Error(response.error);
        }

        resolve({
          gameId,
          drawDates: response.data,
          error: null,
        });
      })
      .catch((error) => {
        resolve({
          gameId,
          drawDates: null,
          error,
        });
      });
  });
};

/**
 * Fetches draw details based on given credentials.
 * @param {GameID} gameId Game ID
 * @param {String} drawDate Draw date
 * @param {Boolean} skipStatic Skip static records or not
 * @returns {Promise<Object>} Draw details
 */
export const getDrawDetailsPromise = (
  gameId: GameID,
  drawDate: string,
  skipStatic: boolean = false,
): Promise<DrawDetailsPromise> => {
  return new Promise((resolve, reject) => {
    if (skipStatic) {
      // Skip if record is already found.
      const resourcePath = buildStaticResourcePath(gameId, drawDate);
      if (fs.existsSync(resourcePath)) {
        return resolve({
          gameId,
          drawDate,
          drawDetails: null,
          error: null,
        });
      }
    }

    getDrawDetails(gameId, drawDate)
      .then((response) => {
        if (response.error) {
          throw new Error(response.error);
        }

        resolve({
          gameId,
          drawDate,
          drawDetails: response.data[0],
          error: null,
        });
      })
      .catch((error) => {
        resolve({
          gameId,
          drawDate,
          drawDetails: null,
          error,
        });
      });
  });
};
