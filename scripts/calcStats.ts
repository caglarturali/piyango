import { GAMES } from '../src/constants';
import { GameID } from '../src/models/Game';
import { MessageType, printMsg } from './_utils';
import DrawUtils from '../src/utils/DrawUtils';
import { RegularDraw } from '../src/models/Regular';
import { getDrawDates, getDrawDetails } from '../src/controllers';
import Stats from '../src/models/Stats';

/**
 * Calculates stats for all games (except piyango).
 * @param write Write to disk or not
 */
const calculateStats = async (write: boolean = false) => {
  // Get all stats for all games, except piyango.
  const statsResults: Stats[] = await Promise.all(
    GAMES.filter((g) => g.id !== GameID.piyango).map(async (game) => {
      return await calculateStatsForGame(game.id);
    }),
  );

  statsResults.forEach((stats) => {
    if (write) {
      stats.writeToDisk();
    } else {
      // tslint:disable-next-line: no-console
      console.log(stats.report());
    }
  });
};

/**
 * Calculates stats for given game.
 * @param gameId Game ID
 */
const calculateStatsForGame = async (gameId: GameID) => {
  if (gameId === GameID.piyango) return new Stats(GameID.sayisal);

  const stats = new Stats(gameId);

  // Get all draw dates for game.
  const { error, data: drawDates } = await getDrawDates(gameId, 0);

  if (error) {
    printMsg(error, MessageType.ERROR);
    return stats;
  }

  // Get draw details for all draws.
  const drawDetailsResults: any[] = await Promise.all(
    drawDates.map(async (drawDate) => {
      const {
        error: detailError,
        data: [drawDetails],
      } = await getDrawDetails(gameId, drawDate);

      if (detailError) {
        printMsg(detailError, MessageType.ERROR);
        return stats;
      }

      return {
        drawDate,
        drawDetails,
      };
    }),
  );

  // Process numbers of each draw.
  drawDetailsResults.forEach(({ drawDate, drawDetails }) => {
    const nums = DrawUtils.getWinningNumbers(
      gameId,
      drawDetails as RegularDraw,
    );
    stats.processColumn(nums, drawDate);
  });

  return stats;
};

calculateStats(true);
