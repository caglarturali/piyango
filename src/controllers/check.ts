/**
 * Check numbers controller.
 */
import { LotteryDrawData, RegularDrawData } from '@caglarturali/piyango-common';
import ApiResponse from '../models/ApiResponse';
import Game, { GameID } from '../models/Game';
import {
  CheckResult,
  ICheckNumbers,
  LotteryCheck,
  RegularCheck,
} from '../models/Check';
import { RegularGame } from '../models/Regular';
import { LotteryGame } from '../models/Lottery';
import CheckBody from '../models/CheckBody';
import { getDrawDetailsForDraw } from './draws';
import { DrawDate } from '../models/DrawDates';
import { GAMES, messages } from '../constants';

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
  const apiResponse = new ApiResponse<CheckResult>();

  const game = GAMES.find((g) => g.id === gameId) as Game;

  const {
    statusCode,
    error,
    data: [drawData],
  } = await getDrawDetailsForDraw(gameId, drawDate);

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
      drawData as LotteryDrawData,
      numbers,
    );

    if (!check.validate()) {
      return apiResponse.setFailed(messages.invalidTicket(), 400);
    }
  } else {
    /**
     * Regular games
     */
    check = new RegularCheck(
      game as RegularGame,
      drawData as RegularDrawData,
      numbers,
    );

    if (!check.validate()) {
      return apiResponse.setFailed(messages.invalidColumn(), 400);
    }
  }

  check.process();

  check.results.forEach((checkRes) => {
    apiResponse.addData(checkRes);
  });

  return apiResponse;
};
