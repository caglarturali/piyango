/**
 * Check numbers controller.
 */

import { GameID } from '../models/Game';
import { GAMES } from '../constants';
import ApiResponse from '../models/ApiResponse';
import { getDrawDetails } from './draws';
import { validDate, validGameId } from './_validate';
import RegularDraw, { MatchTypeRegular } from '../models/RegularDraw';
import DrawUtils from '../utils/DrawUtils';
import { GameColumn } from '../models/GameColumn';
import { CheckResult } from '../models/CheckResult';

export const checkNumbers = async (
  gameId: GameID,
  drawDate: string,
  numbers: GameColumn[],
) => {
  if (gameId !== GameID.piyango) {
    return await checkNumbersAgainstRegularDraw(gameId, drawDate, numbers);
  }
  return new ApiResponse<{}>().setFailed('Not implemented yet', 500);
};

const checkNumbersAgainstRegularDraw = async (
  gameId: GameID,
  drawDate: string,
  numbers: GameColumn[],
) => {
  const apiResponse = new ApiResponse<CheckResult>();

  // Validate gameId and date.
  if (!validGameId(apiResponse, gameId)) return apiResponse;
  if (!validDate(apiResponse, drawDate)) return apiResponse;

  const game = GAMES.find((g) => g.id === gameId);

  const { statusCode, success, error, data } = await getDrawDetails(
    gameId,
    drawDate,
  );
  if (!success && error) {
    apiResponse.setFailed(error, statusCode);
    return apiResponse;
  }

  const [drawData] = data;

  switch (gameId) {
    case GameID.sayisal:
    case GameID.superloto:
    case GameID.onnumara:
      const drawDetails = drawData as RegularDraw;
      const { bilenKisiler } = drawDetails;

      const winningNumbers = DrawUtils.getWinningNumbers(gameId, drawDetails);

      // Validate the length of the numbers
      let columnsValid = true;
      numbers.forEach(({ main, plus }) => {
        // Sort numbers first.
        main.sort((a, b) => a - b);
        if (plus) plus.sort((a, b) => a - b);

        if (game && game.pool) {
          if (main.length !== game.pool.main.select) {
            columnsValid = false;
          }
        }
      });

      if (!columnsValid) {
        apiResponse.setFailed('Incorrect column size', 400);
        break;
      }

      const matched: GameColumn[] = [];
      numbers.forEach(({ main }) => {
        const selection: GameColumn = { main: [] };

        main.forEach((num) => {
          if (winningNumbers.main.includes(num)) {
            selection.main.push(num);
          }
        });

        matched.push(selection);
      });

      matched.forEach((match) => {
        const matchTypeStr =
          match.main.length === 0
            ? MatchTypeRegular.$HIC
            : `$${match.main.length}_BILEN`;

        const winners = bilenKisiler.find((w) => w.tur === matchTypeStr);

        apiResponse.addData({
          type: winners ? matchTypeStr : null,
          match,
          prize: winners ? winners.kisiBasinaDusenIkramiye : 0,
        } as CheckResult);
      });

      break;

    case GameID.sanstopu:
      break;
  }

  return apiResponse;
};
