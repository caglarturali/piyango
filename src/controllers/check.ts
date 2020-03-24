/**
 * Check numbers controller.
 */
import ApiResponse from '../models/ApiResponse';
import Game, { GameID } from '../models/Game';
import {
  ICheckNumbers,
  ICheckResult,
  LotteryCheck,
  RegularCheck,
} from '../models/Check';
import { IRegularDrawData, RegularGame } from '../models/Regular';
import { ILotteryDrawData, LotteryGame } from '../models/Lottery';
import CheckBody from '../models/CheckBody';
import { getDrawDetails } from './draws';
import { DrawDate } from '../models/DrawDate';
import { validDate, validGameId } from './_validate';
import { GAMES } from '../constants';

/**
 * Central point for number checking functionality.
 * @param gameId Game Id
 * @param drawDate Draw date string
 * @param checkBody The body of the request
 */
export const checkNumbers = async (
  gameId: GameID,
  drawDate: DrawDate,
  checkBody: CheckBody,
) => {
  const apiResponse = new ApiResponse<ICheckResult>();

  // Validate gameId and date.
  if (!validGameId(apiResponse, gameId)) return apiResponse;
  if (!validDate(apiResponse, drawDate)) return apiResponse;

  const game = GAMES.find((g) => g.id === gameId) as Game;

  const {
    statusCode,
    error,
    data: [drawData],
  } = await getDrawDetails(gameId, drawDate);

  if (error) {
    return apiResponse.setFailed(error, statusCode);
  }

  const { numbers } = checkBody;
  let check: ICheckNumbers;

  if (gameId === GameID.piyango) {
    /**
     * Piyango
     */
    check = new LotteryCheck(
      game as LotteryGame,
      drawData as ILotteryDrawData,
      numbers,
    );

    if (!check.validate()) {
      return apiResponse.setFailed('Invalid ticket number', 400);
    }
  } else {
    /**
     * Regular games
     */
    check = new RegularCheck(
      game as RegularGame,
      drawData as IRegularDrawData,
      numbers,
    );

    if (!check.validate()) {
      return apiResponse.setFailed('Incorrect column size', 400);
    }
  }

  check.process();

  check.results.forEach((checkRes) => {
    apiResponse.addData(checkRes);
  });

  return apiResponse;
};
