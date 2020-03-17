/**
 * Check numbers controller.
 */
import ApiResponse from '../models/ApiResponse';
import Game, { GameID } from '../models/Game';
import RegularDraw, {
  GameColumn,
  MatchTypeRegular,
  RegularCheckResult,
} from '../models/RegularDraw';
import LotteryDraw, { LotteryCheckResult } from '../models/LotteryDraw';
import DrawUtils from '../utils/DrawUtils';
import { getDrawDetails } from './draws';
import { validDate, validGameId } from './_validate';
import { GAMES } from '../constants';

export const checkNumbers = async (
  gameId: GameID,
  drawDate: string,
  numbers: string[],
) => {
  const apiResponse = new ApiResponse<{}>();

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

  if (gameId === GameID.piyango) {
    return await checkNumbersAgainstLotteryDraw(
      gameId,
      game,
      drawData as LotteryDraw,
      numbers,
    );
  }

  return await checkNumbersAgainstRegularDraw(
    gameId,
    game,
    drawData as RegularDraw,
    numbers,
  );
};

const checkNumbersAgainstRegularDraw = async (
  gameId: GameID,
  game: Game,
  drawData: RegularDraw,
  numbers: string[],
) => {
  const apiResponse = new ApiResponse<RegularCheckResult>();

  const { bilenKisiler } = drawData;

  // Convert string of numbers to GameColumn objects.
  const userNumbers = numbers.map((numsStr) =>
    DrawUtils.convertNumbersToColumn(gameId, numsStr),
  );
  const winningNumbers = DrawUtils.getWinningNumbers(gameId, drawData);

  // Validate the length of the numbers.
  let columnsValid = true;
  userNumbers.forEach(({ main, plus }) => {
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
    } as RegularCheckResult);
  });

  return apiResponse;
};

const checkNumbersAgainstLotteryDraw = async (
  gameId: GameID,
  game: Game,
  drawData: LotteryDraw,
  numbers: string[],
) => {
  const apiResponse = new ApiResponse<LotteryCheckResult>();

  return apiResponse;
};
