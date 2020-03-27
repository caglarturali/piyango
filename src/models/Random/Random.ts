import { GameColumn } from '@piyango/common';
import { GameID, NumbersPool } from '../Game';
import { GAMES } from '../../constants';
import { RegularGame } from '../Regular';
import { NumUtils } from '../../utils';

export default class Random {
  private game: RegularGame;
  private colCount: number;

  constructor(gameId: GameID, columnCount?: number) {
    const game = GAMES.find((g) => g.id === gameId) as RegularGame;
    this.game = game;

    // Set max col count to 1000;
    this.colCount = Math.min(Math.abs(columnCount || game.columns), 1000);
  }

  /**
   * Generates pseudo-random guesses.
   * @returns Array of GameColumn objects
   */
  generate(): GameColumn[] {
    const guesses: GameColumn[] = [];

    for (let i = 1; i <= this.colCount; i++) {
      const col = {} as GameColumn;

      // Loop over game's pools.
      Object.keys(this.game.pool).forEach((pool) => {
        const nums: number[] = [];

        const { from, select } = this.game.pool[pool] as NumbersPool;

        // Create "pool" of numbers.
        const numPool = Array.from({ length: from }, (_, k: number) => k + 1);

        for (let j = 1; j <= select; j++) {
          NumUtils.shuffleNumbers(numPool);
          nums.push(numPool.pop() as number);
        }
        nums.sort((a, b) => a - b);

        col[pool] = nums;
      });

      guesses.push(col);
    }
    return guesses;
  }
}
