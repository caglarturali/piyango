/**
 * Games controller.
 */
import { GAMES } from '../constants';
import ApiResponse from '../models/ApiResponse';
import Game from '../models/Game';

/**
 * Get the list of games that are currently supported.
 */
export const getGames = () => {
  const apiResponse = new ApiResponse<Game>();

  GAMES.forEach(({ id, name }) => {
    apiResponse.addData({
      id,
      name,
    } as Game);
  });

  // Sort asc.
  apiResponse.sortData((a, b) => (a.id > b.id ? 1 : -1));

  return apiResponse;
};
