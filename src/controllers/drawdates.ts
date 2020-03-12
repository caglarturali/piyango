/**
 * Draw dates controller.
 */
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import moment from 'moment';
import stripBom from 'strip-bom';
import ApiResponse from '../models/ApiResponse';
import DrawListing from '../models/DrawListing';
import { SortOrder } from '../models/SortOrder';
import {
  DATE_FORMAT,
  DATE_FORMAT_FRIENDLY,
  GAMES,
  MPI_BASE,
  STATIC_DATA_PATH,
} from '../constants';

/**
 * Builds draw dates url.
 * @param {String} gameId Game ID
 */
const buildDrawDatesUrl = (gameId: string) => {
  return `${MPI_BASE}/listCekilisleriTarihleri.php?tur=${gameId}`;
};

/**
 * Returns draw dates listing for specified game.
 * @param gameId Game ID
 * @param limit Limit to be applied
 * @param order Sorting order of the results
 */
export const getDrawDates = async (
  gameId: string,
  limit: number,
  order: SortOrder,
): Promise<ApiResponse<DrawListing>> => {
  const apiResponse = new ApiResponse<DrawListing>();

  // Check gameId.
  if (!GAMES.some((game) => game === gameId)) {
    apiResponse.setFailed('Game ID is not valid', 404);
    return apiResponse;
  }

  const response = await axios.get(buildDrawDatesUrl(gameId));

  if (response.status !== 200) {
    apiResponse.setFailed('Unable to fetch data', response.status);
    return apiResponse;
  }

  try {
    const data: DrawListing[] = JSON.parse(stripBom(response.data));
    data.forEach((drawListing: DrawListing) => {
      apiResponse.addData(drawListing);
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
  fs.readdirSync(path.join(STATIC_DATA_PATH, gameId)).forEach((fullName) => {
    // Build full path and file name (without extension).
    const fullPath = path.join(STATIC_DATA_PATH, gameId, fullName);
    const extension = path.extname(fullPath);
    const fileName = path.basename(fullPath, extension);

    const tempListing: DrawListing = {
      tarih: fileName,
      tarihView: moment(fileName, DATE_FORMAT).format(DATE_FORMAT_FRIENDLY),
    };

    // Add record if not already found.
    if (!apiResponse.hasItem(tempListing)) {
      apiResponse.addData(tempListing);
    }
  });

  // Sort entries based on order arg.
  apiResponse.sortData((a: DrawListing, b: DrawListing) => {
    const aDate = moment(a.tarih, DATE_FORMAT).unix();
    const bDate = moment(b.tarih, DATE_FORMAT).unix();

    return order === SortOrder.ASC ? aDate - bDate : bDate - aDate;
  });

  // Apply limit if it has a legit value.
  if (limit && limit > 0) {
    apiResponse.applyLimit(limit);
  }

  return apiResponse;
};
