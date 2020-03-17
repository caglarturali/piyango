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
  numbers: string[],
) => {
  if (gameId !== GameID.piyango) {
    return await checkNumbersAgainstRegularDraw(gameId, drawDate, numbers);
  }
  return new ApiResponse<{}>().setFailed('Not implemented yet', 500);
};

const checkNumbersAgainstRegularDraw = async (
  gameId: GameID,
  drawDate: string,
  numbers: string[],
) => {
  const apiResponse = new ApiResponse<CheckResult>();

  const game = GAMES.find((g) => g.id === gameId);

  // Validate gameId and date.
  if (!(validGameId(apiResponse, gameId) && game)) return apiResponse;
  if (!validDate(apiResponse, drawDate)) return apiResponse;

  const {
    statusCode,
    success,
    error,
    data: [drawData],
  } = await getDrawDetails(gameId, drawDate);

  if (!success && error) {
    apiResponse.setFailed(error, statusCode);
    return apiResponse;
  }

  const drawDetails = drawData as RegularDraw;
  const { bilenKisiler } = drawDetails;

  const userNumbers = numbers.map((numsStr) =>
    DrawUtils.convertNumbersToColumn(gameId, numsStr),
  );
  const winningNumbers = DrawUtils.getWinningNumbers(gameId, drawDetails);

  // Validate the length of the numbers.
  let columnsValid = true;
  userNumbers.forEach(({ main, plus }) => {
    // Sort numbers first.
    main.sort((a, b) => a - b);
    if (plus) plus.sort((a, b) => a - b);

    if (main.length !== game.pool?.main.select) {
      columnsValid = false;
    }
    if (
      gameId === GameID.sanstopu &&
      plus?.length !== game.pool?.plus?.select
    ) {
      columnsValid = false;
    }
  });

  if (!columnsValid) {
    apiResponse.setFailed('Incorrect column size', 400);
    return apiResponse;
  }

  // Compare numbers againsts winningNumbers.
  const matched: GameColumn[] = [];
  userNumbers.forEach(({ main, plus }) => {
    const selection: GameColumn = { main: [] };

    main.forEach((num) => {
      if (winningNumbers.main.includes(num)) {
        selection.main.push(num);
      }
    });

    if (gameId === GameID.sanstopu) {
      selection.plus = [];
      plus?.forEach((num) => {
        if (winningNumbers.plus?.includes(num)) {
          selection.plus?.push(num);
        }
      });
    }

    matched.push(selection);
  });

  matched.forEach((match) => {
    let matchTypeStr: string = '$';

    switch (gameId) {
      case GameID.onnumara:
        if (match.main.length === 0) {
          matchTypeStr = MatchTypeRegular.$HIC;
        }
        break;

      case GameID.sanstopu:
        matchTypeStr += `${match.main.length}_`;
        matchTypeStr += match.plus?.length ? `${match.plus.length}_` : '';
        matchTypeStr += 'BILEN';
        break;

      default:
        matchTypeStr += `${match.main.length}_BILEN`;
        break;
    }

    // Try to find a match.
    const winners = bilenKisiler.find((w) => w.tur === matchTypeStr);

    apiResponse.addData({
      type: winners ? matchTypeStr : null,
      match,
      prize: winners ? winners.kisiBasinaDusenIkramiye : 0,
    } as CheckResult);
  });

  return apiResponse;
};
