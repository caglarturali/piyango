/**
 * Draw history controller.
 */
import momentTZ from 'moment-timezone';
import { DateFormat, DrawDate, GameID } from '@caglarturali/piyango-common';
import ApiResponse from '../models/ApiResponse';
import DrawHistory, { DrawHistoryData } from '../models/DrawHistory';

/**
 * Returns draw history of today.
 */
export const getDrawHistoryOfToday = async () => {
  const today = momentTZ().tz('Europe/Istanbul').format(DateFormat.API);
  return await getDrawHistory(today);
};

/**
 * Returns draw history of the date.
 * @param date Date string
 * @param gameId Game Id
 */
export const getDrawHistory = async (date: DrawDate, gameId?: GameID) => {
  const apiResponse = new ApiResponse<DrawHistoryData>();

  const drawHistory = new DrawHistory(date);

  if (gameId) {
    /**
     * Draw history for specific game.
     */
    const { error, draws } = await drawHistory.historyForGame(gameId);
    if (error) return apiResponse.setFailed(error);
    apiResponse.addData({ gameId, draws });
  } else {
    /**
     * Draw history for all games.
     */
    const { error, history } = await drawHistory.historyForGames();
    if (error) return apiResponse.setFailed(error);
    apiResponse.data = history;
  }

  return apiResponse;
};
