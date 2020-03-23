/**
 * Check numbers controller.
 */
import ApiResponse from '../models/ApiResponse';
import Game, { CheckResult, GameID } from '../models/Game';
import {
  GameColumn,
  MatchTypeRegular,
  RegularCheck,
  RegularDraw,
  RegularGame,
} from '../models/Regular';
import { LotteryCheck, LotteryDraw } from '../models/Lottery';
import CheckBody from '../models/CheckBody';
import DrawUtils from '../utils/DrawUtils';
import { getDrawDetails } from './draws';
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
  drawDate: string,
  checkBody: CheckBody,
) => {
  const apiResponse = new ApiResponse<CheckResult>();

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

  if (gameId === GameID.piyango) {
    return await checkNumbersAgainstLotteryDraw(
      drawData as LotteryDraw,
      numbers,
    );
  }

  return await checkNumbersAgainstRegularDraw(
    gameId,
    game as RegularGame,
    drawData as RegularDraw,
    numbers,
  );
};

/**
 * Checks player's numbers against draw data.
 * @param gameId Game Id
 * @param game RegularGame object
 * @param drawData RegularDraw data
 * @param numbers Player's numbers
 */
const checkNumbersAgainstRegularDraw = async (
  gameId: GameID,
  game: RegularGame,
  drawData: RegularDraw,
  numbers: string[],
) => {
  const apiResponse = new ApiResponse<RegularCheck>();

  const { bilenKisiler } = drawData;

  // Convert string of numbers to GameColumn objects.
  const userNumbers = numbers.map((numsStr) =>
    DrawUtils.convertNumbersToColumn(gameId, numsStr),
  );
  const winningNumbers = DrawUtils.getWinningNumbers(gameId, drawData);

  // Validate the length of the numbers.
  let columnsValid = true;
  userNumbers.forEach(({ main, plus }) => {
    if (main.length !== game.pool.main.select) {
      columnsValid = false;
    }
    if (gameId === GameID.sanstopu && plus?.length !== game.pool.plus?.select) {
      columnsValid = false;
    }
  });

  if (!columnsValid) {
    return apiResponse.setFailed('Incorrect column size', 400);
  }

  // Compare numbers againsts winningNumbers.
  const matched: GameColumn[] = [];
  userNumbers.forEach(({ main, plus }) => {
    const numsMatch: GameColumn = { main: [] };

    main.forEach((num) => {
      if (winningNumbers.main.includes(num)) {
        numsMatch.main.push(num);
      }
    });

    if (gameId === GameID.sanstopu) {
      numsMatch.plus = [];
      plus?.forEach((num) => {
        if (winningNumbers.plus?.includes(num)) {
          numsMatch.plus?.push(num);
        }
      });
    }

    matched.push(numsMatch);
  });

  matched.forEach((match) => {
    let matchTypeStr: string = '$';

    switch (gameId) {
      case GameID.onnumara:
        if (match.main.length === 0) {
          // Override!
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
    } as RegularCheck);
  });

  return apiResponse;
};

/**
 * Checks player's numbers against lottery results.
 * @param drawData LotteryDraw data
 * @param numbers Player's numbers
 */
const checkNumbersAgainstLotteryDraw = async (
  drawData: LotteryDraw,
  numbers: string[],
) => {
  const apiResponse = new ApiResponse<LotteryCheck>();

  const { sonuclar } = drawData;

  const teselli = sonuclar.find((s) => s.haneSayisi === 0);
  const rest = sonuclar
    .filter((s) => s.haneSayisi > 0)
    .sort((a, b) => a.haneSayisi - b.haneSayisi);

  // Compare numbers against categories.
  numbers.forEach((num) => {
    let result: LotteryCheck = { type: null, digits: null, prize: 0 };

    // Check "teselli" first.
    if (teselli?.numaralar.includes(num)) {
      result = {
        type: teselli.tip,
        digits: teselli.haneSayisi,
        prize: teselli.ikramiye,
      };

      apiResponse.addData(result);
    } else {
      // Check rest.
      // Keep evaluating categories until the biggest match
      // is found and only add that match to the response.
      rest.forEach((category) => {
        const numToCheck = num.substring(num.length - category.haneSayisi);

        if (category.numaralar.includes(numToCheck)) {
          result = {
            type: category.tip,
            digits: category.haneSayisi,
            prize: category.ikramiye,
          };
        }
      });

      apiResponse.addData(result);
    }
  });

  return apiResponse;
};
