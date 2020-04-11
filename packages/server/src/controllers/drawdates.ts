/**
 * Draw dates controller.
 */
import { DrawDate, GameID } from '@caglarturali/piyango-common';
import ApiResponse from '../models/ApiResponse';
import { SortOrder } from '../models/SortOrder';
import DrawDates from '../models/DrawDates';

/**
 * Returns draw dates listing for specified game.
 * @param gameId Game ID
 * @param limit Limit to be applied. 25 by default. -1 for unlimited.
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

  const drawDates = new DrawDates(gameId, limit, skip, sort);
  await drawDates.collectData();

  if (drawDates.error) {
    return apiResponse.setFailed(drawDates.error);
  }

  return apiResponse.setData(drawDates.paginateData());
};
