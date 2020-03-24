/**
 * Draw history controller.
 */
import moment from 'moment';
import { getDrawDates } from '.';
import ApiResponse from '../models/ApiResponse';
import { GameID } from '../models/Game';
import { DATE_FORMAT, DATE_FORMAT_SHORT, GAMES } from '../constants';
import DrawHistory from '../models/DrawHistory';
import { DrawDate } from '../models/DrawDate';
import { validDate, validGameId } from './_validate';

/**
 * Returns draw history of the date.
 * @param date Date string in YYYYMMDD form
 */
export const getDrawHistory = async (date: DrawDate) => {
  const apiResponse = new ApiResponse<DrawHistory>();

  // Validate date.
  if (!validDate(apiResponse, date)) return apiResponse;

  const results = await Promise.all(
    GAMES.map(async (game) => {
      const { error, data } = await getDrawHistoryForGame(date, game.id);
      return {
        gameId: game.id,
        draws: error ? [] : data,
      };
    }),
  );

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
export const getDrawHistoryForGame = async (date: DrawDate, gameId: GameID) => {
  const apiResponse = new ApiResponse<string>();

  // Validate gameId and date.
  if (!validGameId(apiResponse, gameId)) return apiResponse;
  if (!validDate(apiResponse, date)) return apiResponse;

  const refDate = moment(date, DATE_FORMAT).format(DATE_FORMAT_SHORT);

  const { error, data: drawDates } = await getDrawDates(gameId, 0);

  if (error) {
    return apiResponse.setFailed(error);
  }

  drawDates.forEach((t) => {
    if (refDate === moment(t, DATE_FORMAT).format(DATE_FORMAT_SHORT)) {
      apiResponse.addData(t);
    }
  });

  if (!apiResponse.hasData()) {
    return apiResponse.setFailed('No records were found', 500);
  }

  return apiResponse;
};
