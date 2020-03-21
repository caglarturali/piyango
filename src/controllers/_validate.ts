import { Response } from 'node-fetch';
import { DATE_FORMAT, GAMES } from '../constants';
import { GameID } from '../models/Game';
import ApiResponse from '../models/ApiResponse';
import DateUtils from '../utils/DateUtils';

/**
 * Validates Game Id.
 * @param apiResponse ApiResponse object
 * @param gameId Game ID
 */
export const validGameId = (
  apiResponse: ApiResponse<any>,
  gameId: GameID,
): boolean => {
  if (!GAMES.some((game) => game.id === gameId)) {
    apiResponse.setFailed('Game ID is not valid', 400);
    return false;
  }
  return true;
};

/**
 * Validates date string.
 * @param apiResponse ApiResponse object
 * @param dateStr Date string
 * @param dateFormat Date format
 */
export const validDate = (
  apiResponse: ApiResponse<any>,
  dateStr: string,
  dateFormat: string = DATE_FORMAT,
): boolean => {
  if (!DateUtils.isDateValid(dateStr, dateFormat)) {
    apiResponse.setFailed('Date is not valid', 400);
    return false;
  }
  return true;
};

/**
 * Validates Fetch response.
 * @param response Fetch response
 * @param apiResponse ApiResponse
 */
export const validResponse = (
  response: Response,
  apiResponse: ApiResponse<any>,
): boolean => {
  if (!response.ok) {
    apiResponse.setFailed('Unable to fetch data', response.status);
    return false;
  }
  return true;
};
