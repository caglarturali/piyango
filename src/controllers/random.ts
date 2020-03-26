import ApiResponse from '../models/ApiResponse';
import { GameID } from '../models/Game';
import { GameColumn } from '../models/Regular';
import Random from '../models/Random';

/**
 * Generates columns of pseudo-random numbers for given game.
 * @param gameId Game ID
 * @param columnCount Number of columns to be generated
 */
export const generateRandomGuesses = (gameId: GameID, columnCount?: number) => {
  const apiResponse = new ApiResponse<GameColumn>();

  if (gameId === GameID.piyango) {
    return apiResponse.setFailed(`${gameId} is not supported`);
  }

  const random = new Random(gameId, columnCount);
  apiResponse.data = random.generate();

  return apiResponse;
};
