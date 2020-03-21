import { GameID } from '../src/models/Game';
import { SortOrder } from '../src/models/SortOrder';
import { getDrawDates, getDrawDetails } from '../src/controllers';
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
 * Fetches draw dates for given game.
 * @param gameId Game ID
 * @param limit Limit to be applied
 * @param skip Count of entries to skip
 * @param sort Sorting order of the results
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
 */
export const getDrawDetailsPromise = (
  gameId: GameID,
  drawDate: string,
): Promise<DrawDetails> => {
  return new Promise(async (resolve, _reject) => {
    const { error, data } = await getDrawDetails(gameId, drawDate);

    if (error) {
      return resolve({
        gameId,
        drawDate,
        error,
      });
    }

    resolve({
      gameId,
      drawDate,
      drawDetails: data[0],
    });
  });
};

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
