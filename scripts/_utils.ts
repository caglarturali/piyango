import fs from 'fs';
import { GameID } from '../src/models/Game';
import { SortOrder } from '../src/models/SortOrder';
import { getDrawDates, getDrawDetails } from '../src/controllers';
import { buildStaticResourcePath } from '../src/utils/static';
import apiconfig from '../src/apiconfig';
import RegularDraw from '../src/models/RegularDraw';
import LotteryDraw from '../src/models/LotteryDraw';

export interface DrawDates {
  gameId: GameID;
  drawDates?: string[];
  error?: string;
}

export interface DrawDetails {
  gameId: GameID;
  drawDate: string;
  drawDetails?: RegularDraw | LotteryDraw;
  error?: string;
}

/**
 * Prints beautified text.
 * @param {String} text Raw text
 * @param {Boolean} isError Is error message or not
 */
export const printMsg = (text: string, isError: boolean = false) => {
  // tslint:disable: no-console
  if (isError) return console.error(`*** ${text} ***`);
  console.log(`=== ${text} ===`);
  // tslint:enable: no-console
};

/**
 * Fetches draw dates for given game.
 * @param {GameID} gameId Game ID
 * @returns {Promise<Object>} Draw dates promise
 */
export const getDrawDatesPromise = (
  gameId: GameID,
  limit: number = apiconfig.drawdates.limit,
  skip: number = apiconfig.drawdates.skip,
  sort: SortOrder = SortOrder.DESC,
): Promise<DrawDates> => {
  return new Promise(async (resolve, _reject) => {
    const { data, error } = await getDrawDates(gameId, limit, skip, sort);

    if (error) {
      return resolve({
        gameId,
        error,
      });
    }

    resolve({
      gameId,
      drawDates: data,
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
): Promise<DrawDetails> => {
  return new Promise((resolve, reject) => {
    if (skipStatic) {
      // Skip if record is already found.
      const resourcePath = buildStaticResourcePath(gameId, drawDate);
      if (fs.existsSync(resourcePath)) {
        return resolve({
          gameId,
          drawDate,
        });
      }
    }

    getDrawDetails(gameId, drawDate)
      .then(({ error, data }) => {
        if (error) {
          throw new Error(error);
        }

        resolve({
          gameId,
          drawDate,
          drawDetails: data[0],
        });
      })
      .catch((error) => {
        resolve({
          gameId,
          drawDate,
          error,
        });
      });
  });
};
