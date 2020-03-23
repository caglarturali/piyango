import ApiResponse from '../models/ApiResponse';
import { GameID, NumbersPool } from '../models/Game';
import { validGameId } from './_validate';
import { GAMES } from '../constants';
import { GameColumn, RegularGame } from '../models/Regular';
import { NumUtils } from '../utils';

/**
 * Generates columns of pseudo-random numbers for given game.
 * @param gameId Game ID
 * @param columnCount Number of columns to be generated
 */
export const generateGuesses = (
  gameId: GameID,
  columnCount: number | undefined,
) => {
  const apiResponse = new ApiResponse<GameColumn>();

  if (!validGameId(apiResponse, gameId)) return apiResponse;

  if (gameId === GameID.piyango) {
    return apiResponse.setFailed(`${gameId} is not supported`);
  }

  const game = GAMES.find((g) => g.id === gameId) as RegularGame;
  if (!game.pool) {
    return apiResponse.setFailed('Unexpected error');
  }

  let colCount = Math.abs(columnCount || game.columns);
  if (colCount > 1000) colCount = 1000;

  // Generate random numbers
  for (let i = 1; i <= colCount; i++) {
    const col = {} as GameColumn;

    // Loop over game's pools.
    Object.keys(game.pool).forEach((pool) => {
      const nums: number[] = [];

      const { from, select } = game.pool[pool] as NumbersPool;

      // Create "pool" of numbers.
      const numPool = Array.from({ length: from }, (_, k: number) => k + 1);

      for (let j = 1; j <= select; j++) {
        NumUtils.shuffleNumbers(numPool);
        nums.push(numPool.pop() as number);
      }
      nums.sort((a, b) => a - b);

      col[pool] = nums;
    });

    apiResponse.addData(col);
  }

  return apiResponse;
};
