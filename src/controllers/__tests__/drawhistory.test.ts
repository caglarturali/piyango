import { getDrawHistory, getDrawHistoryForGame } from '../drawhistory';
import { GAMES } from '../../constants';
import { GameID } from '../../models/Game';
import DateUtils from '../../utils/DateUtils';

test('should get draw history for all games for given date', async () => {
  const dateStr = '20200101';
  const { data } = await getDrawHistory(dateStr);

  expect(data).toHaveLength(GAMES.length);
  data.forEach(({ gameId, draws }) => {
    expect(gameId).toBeDefined();
    expect(draws).toBeDefined();
    draws.forEach((date) => {
      expect(DateUtils.isDateValid(date)).toBeTruthy();
    });
  });
});

test('should get draw history for given game and date', async () => {
  const dateStr = '20191231';
  const { data } = await getDrawHistoryForGame(dateStr, GameID.piyango);

  expect(data.length).toBeGreaterThan(0);
  data.forEach((date) => {
    expect(DateUtils.isDateValid(date)).toBeTruthy();
  });
});
