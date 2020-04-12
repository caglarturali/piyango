import {
  DateFormat,
  GameID,
  GAMES,
  RegularDrawData,
} from '@caglarturali/piyango-common';
import { DateUtils, DrawUtils } from '@caglarturali/piyango-utils';
import Stats from '../src/models/Stats/Stats';
import db from '../src/db';

/**
 * Calculates stats for all games (except piyango).
 * @param write Write to disk or not
 */
const calculateStats = (write: boolean = false) => {
  // Get all stats for all games, except piyango.
  const statsResults: (Stats | null)[] = GAMES.filter(
    (g) => g.id !== GameID.piyango,
  ).map((game) => {
    return calculateStatsForGame(game.id);
  });

  statsResults.forEach((stats) => {
    if (!stats) return;

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
const calculateStatsForGame = (gameId: GameID) => {
  if (gameId === GameID.piyango) return null;

  const stats = new Stats(gameId);

  // Get records for all draws.
  const records = db[gameId].get('draws').value();

  // Process numbers of each draw.
  records.forEach((r) => {
    const { cekilisTarihi, rakamlar } = r as RegularDrawData;
    const drawDate = DateUtils.convert(
      cekilisTarihi,
      DateFormat.FRIENDLY,
      DateFormat.API,
    );
    const nums = DrawUtils.convertNumbersToSelection(gameId, rakamlar);
    stats.processSelection(nums, drawDate);
  });

  return stats;
};

calculateStats(true);
