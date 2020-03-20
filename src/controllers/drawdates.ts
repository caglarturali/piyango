/**
 * Draw dates controller.
 */
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import moment from 'moment';
import stripBom from 'strip-bom';
import ApiResponse from '../models/ApiResponse';
import DrawListing from '../models/DrawListing';
import { SortOrder } from '../models/SortOrder';
import { GameID } from '../models/Game';
import { DATE_FORMAT, DRAWS_DATA_PATH, MPI_BASE } from '../constants';
import { validGameId, validResponse } from './_validate';

/**
 * Builds draw dates url.
 * @param {GameID} gameId Game ID
 */
const buildDrawDatesUrl = (gameId: GameID) => {
  return `${MPI_BASE}/listCekilisleriTarihleri.php?tur=${gameId}`;
};

/**
 * Returns draw dates listing for specified game.
 * @param gameId Game ID
 * @param limit Limit to be applied
 * @param skip Count of entries to skip
 * @param sort Sorting order of the results
 */
export const getDrawDates = async (
  gameId: GameID,
  limit: number,
  skip: number,
  sort: SortOrder,
): Promise<ApiResponse<string>> => {
  const apiResponse = new ApiResponse<string>();

  // Validate gameId.
  if (!validGameId(apiResponse, gameId)) return apiResponse;

  const response = await fetch(buildDrawDatesUrl(gameId), { method: 'GET' });

  if (!validResponse(response, apiResponse)) return apiResponse;

  try {
    const body = await response.text();
    const data: DrawListing[] = JSON.parse(stripBom(body));
    data.forEach(({ tarih }: DrawListing) => {
      // Add only "tarih" field!
      apiResponse.addData(tarih);
    });

    if (!apiResponse.hasData()) {
      throw new Error('No results returned');
    }
  } catch (error) {
    apiResponse.setFailed(error.message, 500);
  }

  if (apiResponse.error) {
    return apiResponse;
  }

  // Append static data.
  fs.readdirSync(path.join(DRAWS_DATA_PATH, gameId)).forEach((fullName) => {
    // Build full path and file name (without extension).
    const fullPath = path.join(DRAWS_DATA_PATH, gameId, fullName);
    const extension = path.extname(fullPath);
    const fileName = path.basename(fullPath, extension);

    // Add record if not already found.
    if (!apiResponse.hasItem(fileName)) {
      apiResponse.addData(fileName);
    }
  });

  // Sort entries based on order arg.
  apiResponse.sortData((a, b) => {
    const aDate = moment(a, DATE_FORMAT).unix();
    const bDate = moment(b, DATE_FORMAT).unix();

    return sort === SortOrder.ASC ? aDate - bDate : bDate - aDate;
  });

  // Paginate results if limit has a legit value.
  if (limit && limit > 0) {
    apiResponse.paginate(limit, skip);
  }

  return apiResponse;
};
