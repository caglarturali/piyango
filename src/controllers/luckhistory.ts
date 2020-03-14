/**
 * Luck history controller.
 */
import moment from 'moment';
import { getDrawDates } from '.';
import ApiResponse from '../models/ApiResponse';
import { GameID } from '../models/GameID';
import { isDateValid } from '../utils';
import { DATE_FORMAT, DATE_FORMAT_SHORT, GAMES } from '../constants';
import LuckHistory from '../models/LuckHistory';
import { SortOrder } from '../models/SortOrder';

/**
 * Creates an always resolving promise for
 * batch processing purposes.
 * @param date Date string
 * @param gameId Game Id
 */
const luckHistoryPromise = (
  date: string,
  gameId: GameID,
): Promise<LuckHistory> => {
  return new Promise((resolve, reject) => {
    getLuckHistoryForGame(date, gameId)
      .then((response) => {
        if (response.error) {
          throw new Error(response.error);
        }

        resolve({
          gameId,
          draws: response.data,
        });
      })
      .catch(() => {
        resolve({
          gameId,
          draws: [],
        });
      });
  });
};

/**
 * Returns luck history of the date.
 * @param date Date string in YYYYMMDD form
 */
export const getLuckHistory = async (date: string) => {
  const apiResponse = new ApiResponse<LuckHistory>();

  // Check date.
  if (!isDateValid(date)) {
    apiResponse.setFailed('Date is not valid', 400);
    return apiResponse;
  }

  const promises: Promise<LuckHistory>[] = [];
  GAMES.forEach((game) => {
    promises.push(luckHistoryPromise(date, game as GameID));
  });

  const results = await Promise.all(promises);
  results.forEach(({ gameId, draws }) => {
    apiResponse.addData({
      gameId,
      draws,
    });
  });

  return apiResponse;
};

/**
 * Returns luck history of the date for given game.
 * @param date Date string
 * @param gameId Game Id
 */
export const getLuckHistoryForGame = async (date: string, gameId: GameID) => {
  const apiResponse = new ApiResponse<string>();

  // Check gameId.
  if (!GAMES.some((game) => game === gameId)) {
    apiResponse.setFailed('Game ID is not valid', 400);
    return apiResponse;
  }

  // Check date.
  if (!isDateValid(date)) {
    apiResponse.setFailed('Date is not valid', 400);
    return apiResponse;
  }

  const refDate = moment(date, DATE_FORMAT).format(DATE_FORMAT_SHORT);

  const drawDates = await getDrawDates(gameId, 0, 0, SortOrder.DESC);
  apiResponse.data = drawDates.data
    .map(({ tarih }) => tarih)
    .filter((t) => {
      return refDate === moment(t, DATE_FORMAT).format(DATE_FORMAT_SHORT);
    });

  if (!apiResponse.hasData()) {
    apiResponse.setFailed('No records were found', 500);
  }

  return apiResponse;
};
