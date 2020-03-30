import {
  GameID,
  GAMES,
  NumbersPool,
  RegularGame,
} from '@caglarturali/piyango-common';
import { generateRandomGuesses } from '../random';

test('should successfully generate random numbers for given game', async () => {
  const gameId = GameID.sanstopu;
  const colCount = 10;
  const game = GAMES.find((g) => g.id === gameId) as RegularGame;

  const { select: mainCount } = game.pool.main;
  const { select: plusCount } = game.pool.plus as NumbersPool;

  const { statusCode, data } = await generateRandomGuesses(gameId, colCount);

  expect(statusCode).toBe(200);
  expect(data).toHaveLength(colCount);
  data.forEach((col) => {
    expect(col.main).toBeDefined();
    expect(col.plus).toBeDefined();
    expect(col.main).toHaveLength(mainCount);
    expect(col.plus).toHaveLength(plusCount);
  });
});
