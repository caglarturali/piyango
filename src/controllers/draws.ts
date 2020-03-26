/**
 * Draws controller.
 */
import { GAMES } from '../constants';
import ApiResponse from '../models/ApiResponse';
import { GameID } from '../models/Game';
import { getDrawDates } from './drawdates';
import { validDate, validGameId } from './_validate';
import DateUtils from '../utils/DateUtils';
import Draw, { DrawDataType } from '../models/Draw';
import { DrawDate } from '../models/DrawDates';

/**
 * Returns latest draws in descending order by date.
 */
export const getDrawDetailsForLatestDraws = async () => {
  const apiResponse = new ApiResponse<DrawDataType>();

  const results: DrawDataType[] = await Promise.all(
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
  const { error, data } = await getDrawDates(gameId, 1);
  if (error) {
    return new ApiResponse<DrawDataType>().setFailed(error);
  }
  const [lastDrawStr] = data;
  return await getDrawDetails(gameId, lastDrawStr);
};

/**
 * Returns draw details for given game and dates.
 * @param gameId Game ID
 * @param drawDates Draw dates
 */
export const getDrawDetailsForDraws = async (
  gameId: GameID,
  drawDates: DrawDate[],
) => {
  const apiResponse = new ApiResponse<DrawDataType>();

  const results = await Promise.all(
    drawDates.map(async (drawDate) => {
      const {
        error,
        data: [drawDetails],
      } = await getDrawDetails(gameId, drawDate);
      return {
        error,
        drawDetails,
      };
    }),
  );

  results.forEach(({ drawDetails, error }) => {
    apiResponse.addData(drawDetails || { error });
  });

  return apiResponse;
};

/**
 * Returns draw details for given game and given date.
 * @param {GameID} gameId Game ID
 * @param {String} drawDate Draw date in YYYYMMDD format
 */
export const getDrawDetails = async (gameId: GameID, drawDate: DrawDate) => {
  const apiResponse = new ApiResponse<DrawDataType>();

  // Validate gameId and date.
  if (!validGameId(apiResponse, gameId)) return apiResponse;
  if (!validDate(apiResponse, drawDate)) return apiResponse;

  /**
   * Return static data or fetch it from the web service.
   */
  const draw = Draw.fromFile(gameId, drawDate);
  if (!draw.drawData) {
    await draw.fetchData();
  }

  // Check drawData first!
  if (draw.drawData) return apiResponse.addData(draw.drawData);
  if (draw.error) return apiResponse.setFailed(draw.error);
  return apiResponse;
};
