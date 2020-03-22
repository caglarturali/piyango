/**
 * Draws controller.
 */
import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment';
import stripBom from 'strip-bom';
import {
  DATE_FORMAT,
  DATE_FORMAT_FRIENDLY,
  GAMES,
  MPI_BASE,
} from '../constants';
import ApiResponse from '../models/ApiResponse';
import RegularDraw from '../models/RegularDraw';
import LotteryDraw from '../models/LotteryDraw';
import { GameID } from '../models/Game';
import PathUtils from '../utils/PathUtils';
import { getDrawDates } from './drawdates';
import { SortOrder } from '../models/SortOrder';
import { validDate, validGameId } from './_validate';
import DateUtils from '../utils/DateUtils';

interface PromiseResult {
  data?: any;
  error?: string;
}

/**
 * Builds resource names array based on game id and draw data.
 * @param {GameID} gameId Game ID
 * @param {String} drawDate Draw date in YYYYMMDD format
 * @returns {String[]} Resource names
 */
export const buildResourceNames = (
  gameId: GameID,
  drawDate: string,
): string[] => {
  const resourceNames = [`${drawDate}.json`];

  // Edge case that needs to be covered!
  if (gameId === GameID.sayisal) {
    resourceNames.push(`SAY_${drawDate}.json`);
  }
  return resourceNames;
};

/**
 * Builds the urls for draw details resource.
 * @param {GameID} gameId Game ID
 * @param {String} drawDate Draw date in YYYYMMDD format
 * @returns {String[]} Draw details urls
 */
export const buildDrawDetailsUrls = (
  gameId: GameID,
  drawDate: string,
): string[] => {
  return buildResourceNames(gameId, drawDate).map(
    (rName) => `${MPI_BASE}/cekilisler/${gameId}/${rName}`,
  );
};

/**
 * Returns latest draws in descending order by date.
 */
export const getDrawDetailsForLatestDraws = async () => {
  const apiResponse = new ApiResponse<RegularDraw | LotteryDraw>();

  const results: (RegularDraw | LotteryDraw)[] = await Promise.all(
    GAMES.map(async ({ id }) => {
      const { data } = await getDrawDetailsForLastDraw(id);
      const [drawData] = data;
      return drawData;
    }),
  );

  results.forEach((data) => {
    apiResponse.addData(data);
  });

  if (apiResponse.hasData()) {
    apiResponse.sortData((a, b) => {
      return DateUtils.isGreaterThan(b.cekilisTarihi, a.cekilisTarihi) ? 1 : -1;
    });
  }

  return apiResponse;
};

/**
 * Returns the details of the last draw for given game.
 * @param gameId Game ID
 */
export const getDrawDetailsForLastDraw = async (gameId: GameID) => {
  const { error, data } = await getDrawDates(gameId, 1, 0, SortOrder.DESC);
  if (error) {
    return new ApiResponse<RegularDraw | LotteryDraw>().setFailed(error);
  }
  const [lastDrawStr] = data;
  return await getDrawDetails(gameId, lastDrawStr);
};

/**
 * Returns draw details for given game and given date.
 * @param {GameID} gameId Game ID
 * @param {String} drawDate Draw date in YYYYMMDD format
 */
export const getDrawDetails = async (gameId: GameID, drawDate: string) => {
  const apiResponse =
    gameId === GameID.piyango
      ? new ApiResponse<LotteryDraw>()
      : new ApiResponse<RegularDraw>();

  // Validate gameId and date.
  if (!validGameId(apiResponse, gameId)) return apiResponse;
  if (!validDate(apiResponse, drawDate)) return apiResponse;

  /**
   * Return static data if found.
   */
  const resourcePath = PathUtils.drawResourcePath(gameId, drawDate);
  if (fs.existsSync(resourcePath)) {
    const fileContents = JSON.parse(fs.readFileSync(resourcePath).toString());
    apiResponse.addData(fileContents);
    return apiResponse;
  }

  /**
   * Fetch results from the web service.
   */
  const urls = buildDrawDetailsUrls(gameId, drawDate);

  const results: PromiseResult[] = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url, { method: 'GET' });

      if (!response.ok) {
        return {
          error: `Error ${response.status}: ${response.statusText}`,
        };
      }

      const text = await response.text();
      const data = JSON.parse(stripBom(text));

      // Necessary for piyango.
      if (gameId === GameID.piyango) {
        const dateOriginal = data.cekilisTarihi;
        const dateNew = moment(dateOriginal, DATE_FORMAT).format(
          DATE_FORMAT_FRIENDLY,
        );

        // Append new fields.
        data.cekilisTarihi = dateNew;
        data.cekilisTarihiRaw = dateOriginal;
      }

      return { data };
    }),
  );

  let finalData;
  let finalError;

  results.forEach(({ error, data }) => {
    if (error) finalError = error;
    if (data) finalData = data;
  });

  if (finalData) {
    if (gameId === GameID.piyango) {
      // Return it as is.
      apiResponse.addData(finalData);
    } else {
      // Return only "data" field.
      // TODO: Find a better solution!
      apiResponse.addData(finalData['data']); // tslint:disable-line: no-string-literal
    }
  } else if (finalError) {
    apiResponse.setFailed(finalError, 500);
  } else {
    // Request is not fullfilled so far.
    apiResponse.setFailed('Resource not found', 500);
  }

  return apiResponse;
};
