/**
 * Random controller.
 */
import { Column, GameID } from '@caglarturali/piyango-common';
import { Random } from '@caglarturali/piyango-utils';
import ApiResponse from '../models/ApiResponse';
import { messages } from '../constants';

/**
 * Generates columns of pseudo-random numbers for given game.
 * @param gameId Game ID
 * @param columnCount Number of columns to be generated
 */
export const generateRandomGuesses = (gameId: GameID, columnCount?: number) => {
  const apiResponse = new ApiResponse<Column>();

  if (gameId === GameID.piyango) {
    return apiResponse.setFailed(messages.notSupported(gameId));
  }

  const random = new Random(gameId, columnCount);
  apiResponse.data = random.generate();

  return apiResponse;
};
