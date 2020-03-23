import { getStatsForGame } from '../stats';
import { getDrawDates } from '../drawdates';
import { GameID } from '../../models/Game';
import { SortOrder } from '../../models/SortOrder';
import { GAMES } from '../../constants';
import { RegularGame } from '../../models/Regular';

test('should successfully get up-to-date report for given game', async () => {
  const gameId = GameID.sanstopu;
  const game = GAMES.find((g) => g.id === gameId) as RegularGame;

  // Get latest draw date.
  const {
    data: [lastDrawDate],
  } = await getDrawDates(gameId, 1, 0, SortOrder.DESC);

  const {
    statusCode,
    data: [stats],
  } = await getStatsForGame(gameId);

  expect(statusCode).toBe(200);
  expect(stats.lastDraw).toBe(lastDrawDate);

  let totalNums: number;
  totalNums = game.pool.main.from;
  if (game.pool.plus) {
    totalNums += game.pool.plus.from;
  }
  expect(Object.keys(stats.numbers).length).toBe(totalNums);
});
