/**
 * Stats controller.
 */
import { GameID } from '../models/Game';
import ApiResponse from '../models/ApiResponse';
import Stats from '../models/Stats';
import { getDrawDates } from './drawdates';
import DateUtils from '../utils/DateUtils';
import { getDrawDetailsForDraw } from './draws';
import { RegularDrawData } from '../models/Regular';
import DrawUtils from '../utils/DrawUtils';

/**
 * Gets the statistics for given game.
 * @param gameId Game ID
 */
export const getStatsForGame = async (gameId: GameID) => {
  const apiResponse = new ApiResponse<Stats>();

  if (gameId === GameID.piyango) {
    return apiResponse.setFailed(`${gameId} is not supported`);
  }

  // Start with static data.
  const stats = Stats.fromFile(gameId);

  // Get all draw dates for the game.
  const { error, data: drawDates } = await getDrawDates(gameId, -1);

  if (error) {
    return apiResponse.setFailed(error);
  }

  // Find newer draws (if any).
  const drawsToCalc = drawDates.filter((drawDate) =>
    DateUtils.isGreaterThan(drawDate, stats.lastDraw),
  );

  // Records are up-to-date.
  if (drawsToCalc.length === 0) {
    return apiResponse.addData(stats);
  }

  // Take missing draws into account.
  const drawDetailsResults = await Promise.all(
    drawsToCalc.map(async (drawDate) => {
      const {
        data: [drawDetails],
      } = await getDrawDetailsForDraw(gameId, drawDate);
      return {
        drawDate,
        drawDetails: drawDetails as RegularDrawData,
      };
    }),
  );

  // Process numbers.
  drawDetailsResults.forEach(({ drawDate, drawDetails }) => {
    const nums = DrawUtils.getWinningNumbers(gameId, drawDetails);
    stats.processColumn(nums, drawDate);
  });

  return apiResponse.addData(stats);
};
