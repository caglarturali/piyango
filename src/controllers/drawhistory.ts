/**
 * Luck history controller.
 */
import moment from 'moment';
import { getDrawDates } from '.';
import ApiResponse from '../models/ApiResponse';
import { GameID } from '../models/GameID';
import { isDateValid } from '../utils';
import { DATE_FORMAT, DATE_FORMAT_SHORT, GAMES } from '../constants';
import DrawHistory from '../models/DrawHistory';
import { SortOrder } from '../models/SortOrder';

/**
 * Creates an always resolving promise for
 * batch processing purposes.
 * @param date Date string
 * @param gameId Game Id
 */
const drawHistoryPromise = (
  date: string,
  gameId: GameID,
): Promise<DrawHistory> => {
  return new Promise((resolve, reject) => {
    getDrawHistoryForGame(date, gameId)
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
 * Returns draw history of the date.
 * @param date Date string in YYYYMMDD form
 */
export const getDrawHistory = async (date: string) => {
  const apiResponse = new ApiResponse<DrawHistory>();

  // Check date.
  if (!isDateValid(date)) {
    apiResponse.setFailed('Date is not valid', 400);
    return apiResponse;
  }

  const promises: Promise<DrawHistory>[] = [];
  GAMES.forEach((game) => {
    promises.push(drawHistoryPromise(date, game as GameID));
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
 * Returns draw history of the date for given game.
 * @param date Date string
 * @param gameId Game Id
 */
export const getDrawHistoryForGame = async (date: string, gameId: GameID) => {
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
