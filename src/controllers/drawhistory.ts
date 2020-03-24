/**
 * Draw history controller.
 */
import momentTZ from 'moment-timezone';
import ApiResponse from '../models/ApiResponse';
import { GameID } from '../models/Game';
import { DATE_FORMAT } from '../constants';
import { DrawHistory, IDrawHistory } from '../models/DrawHistory';
import { DrawDate } from '../models/DrawDate';
import { validDate, validGameId } from './_validate';

/**
 * Returns draw history of today.
 */
export const getDrawHistoryOfToday = async () => {
  const today = momentTZ()
    .tz('Europe/Istanbul')
    .format(DATE_FORMAT);
  return await getDrawHistory(today);
};

/**
 * Returns draw history of the date.
 * @param date Date string
 */
export const getDrawHistory = async (date: DrawDate) => {
  const apiResponse = new ApiResponse<IDrawHistory>();

  // Validate date.
  if (!validDate(apiResponse, date)) return apiResponse;

  const drawHistory = new DrawHistory(date);

  const { error, history } = await drawHistory.historyForGames();

  if (error) {
    return apiResponse.setFailed(error);
  }

  apiResponse.data = history;

  return apiResponse;
};

/**
 * Returns draw history of the date for given game.
 * @param date Date string
 * @param gameId Game Id
 */
export const getDrawHistoryForGame = async (date: DrawDate, gameId: GameID) => {
  const apiResponse = new ApiResponse<DrawDate>();

  // Validate gameId and date.
  if (!validGameId(apiResponse, gameId)) return apiResponse;
  if (!validDate(apiResponse, date)) return apiResponse;

  const drawHistory = new DrawHistory(date);

  const { error, history } = await drawHistory.historyForGame(gameId);

  if (error) {
    return apiResponse.setFailed(error);
  }

  apiResponse.data = history;

  return apiResponse;
};
