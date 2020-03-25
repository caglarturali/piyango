/**
 * Draw dates controller.
 */
import ApiResponse from '../models/ApiResponse';
import { SortOrder } from '../models/SortOrder';
import { GameID } from '../models/Game';
import { DrawDate, DrawDates } from '../models/DrawDates';
import { validGameId } from './_validate';

/**
 * Returns draw dates listing for specified game.
 * @param gameId Game ID
 * @param limit Limit to be applied. 25 by default.
 * @param skip Count of entries to skip. 0 by default.
 * @param sort Sorting order of the results. DESC by default.
 */
export const getDrawDates = async (
  gameId: GameID,
  limit?: number,
  skip?: number,
  sort?: SortOrder,
): Promise<ApiResponse<DrawDate>> => {
  const apiResponse = new ApiResponse<DrawDate>();

  // Validate gameId.
  if (!validGameId(apiResponse, gameId)) return apiResponse;

  const drawDates = new DrawDates(gameId, limit, skip, sort);

  await drawDates.collectData();

  if (drawDates.error) {
    return apiResponse.setFailed(drawDates.error);
  }

  apiResponse.data = drawDates.paginateData();

  return apiResponse;
};
