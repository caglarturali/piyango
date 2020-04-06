/**
 * Stats controller.
 */
import { GameID, RegularDrawData } from '@caglarturali/piyango-common';
import { DateUtils, ProcessDraw } from '@caglarturali/piyango-utils';
import ApiResponse from '../models/ApiResponse';
import Stats from '../models/Stats';
import { getDrawDates } from './drawdates';
import { getDrawDetailsForDraw } from './draws';
import { messages } from '../constants';

/**
 * Gets the statistics for given game.
 * @param gameId Game ID
 */
export const getStatsForGame = async (gameId: GameID) => {
  const apiResponse = new ApiResponse<Stats>();

  if (gameId === GameID.piyango) {
    return apiResponse.setFailed(messages.notSupported(gameId));
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
    const nums = new ProcessDraw<RegularDrawData>(
      gameId,
      drawDetails,
    ).winningNumbers();
    stats.processColumn(nums, drawDate);
  });

  return apiResponse.addData(stats);
};
