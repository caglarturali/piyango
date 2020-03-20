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
import { buildStaticResourcePath } from '../utils';
import { getDrawDates } from './drawdates';
import { SortOrder } from '../models/SortOrder';
import { validDate, validGameId } from './_validate';
import Draw from '../models/Draw';

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
  const resourceNames = buildResourceNames(gameId, drawDate);
  return resourceNames.map(
    (rName) => `${MPI_BASE}/cekilisler/${gameId}/${rName}`,
  );
};

/**
 * Fetches draw details based on given credentials.
 * @param {GameID} gameId Game ID
 * @param {String} url Draw details WEB service url
 * @returns {Promise<PromiseResult>} Draw details
 */
export const getDrawDetailsPromise = (
  gameId: GameID,
  url: string,
): Promise<PromiseResult> => {
  return new Promise(async (resolve, _reject) => {
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      return resolve({
        error: `Error ${response.status}: ${response.statusText}`,
      });
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

    resolve({
      data,
    });
  });
};

/**
 * Returns latest draws in descending order by date.
 */
export const getDrawDetailsForLatestDraws = async () => {
  const apiResponse = new ApiResponse<RegularDraw | LotteryDraw>();
  const promises: Promise<any>[] = [];

  GAMES.forEach(({ id }) => {
    promises.push(
      (() =>
        new Promise(async (resolve, _reject) => {
          const { data } = await getDrawDetailsForLastDraw(id);
          const [drawData] = data;
          resolve(drawData);
        }))(),
    );
  });

  const results = await Promise.all(promises);
  results.forEach((data) => {
    apiResponse.addData(data);
  });

  if (apiResponse.hasData()) {
    apiResponse.sortData((a, b) => {
      return (
        moment((b as Draw).cekilisTarihi, DATE_FORMAT_FRIENDLY).unix() -
        moment((a as Draw).cekilisTarihi, DATE_FORMAT_FRIENDLY).unix()
      );
    });
  }

  return apiResponse;
};

/**
 * Returns the details of the last draw for given game.
 * @param gameId Game ID
 */
export const getDrawDetailsForLastDraw = async (gameId: GameID) => {
  const drawDatesResp = await getDrawDates(gameId, 1, 0, SortOrder.DESC);
  if (drawDatesResp.error) {
    return drawDatesResp;
  }
  const [lastDrawStr] = drawDatesResp.data;
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
  const resourcePath = buildStaticResourcePath(gameId, drawDate);
  if (fs.existsSync(resourcePath)) {
    const fileContents = require(resourcePath);
    apiResponse.addData(fileContents);
    return apiResponse;
  }

  /**
   * Fetch results from the web service.
   */

  // Build promises array with urls.
  const drawDetailsPromises: any[] = [];
  const urls = buildDrawDetailsUrls(gameId, drawDate);
  urls.forEach((url) => {
    drawDetailsPromises.push(getDrawDetailsPromise(gameId, url));
  });

  // Wait for promises to resolve and return succesful result (if any).
  const results: PromiseResult[] = await Promise.all(drawDetailsPromises);
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
