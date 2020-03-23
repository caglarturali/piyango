/**
 * Check numbers controller.
 */
import ApiResponse from '../models/ApiResponse';
import Game, { GameID, ICheckResult } from '../models/Game';
import { RegularCheck, RegularDraw, RegularGame } from '../models/Regular';
import { LotteryCheck, LotteryDraw, LotteryGame } from '../models/Lottery';
import CheckBody from '../models/CheckBody';
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

  if (gameId === GameID.piyango) {
    return await checkNumbersAgainstLotteryDraw(
      game as LotteryGame,
      drawData as LotteryDraw,
      numbers,
    );
  }

  return await checkNumbersAgainstRegularDraw(
    game as RegularGame,
    drawData as RegularDraw,
    numbers,
  );
};

/**
 * Checks player's numbers against draw data.
 * @param game RegularGame object
 * @param drawData RegularDraw data
 * @param numbers Player's numbers
 */
const checkNumbersAgainstRegularDraw = async (
  game: RegularGame,
  drawData: RegularDraw,
  numbers: string[],
) => {
  const apiResponse = new ApiResponse<ICheckResult>();
  const check = new RegularCheck(game, drawData, numbers);

  if (!check.validate()) {
    return apiResponse.setFailed('Incorrect column size', 400);
  }

  check.process();

  check.results.forEach((checkRes) => {
    apiResponse.addData(checkRes);
  });

  return apiResponse;
};

/**
 * Checks player's numbers against lottery results.
 * @param game LotteryGame object
 * @param drawData LotteryDraw data
 * @param numbers Player's numbers
 */
const checkNumbersAgainstLotteryDraw = async (
  game: LotteryGame,
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
