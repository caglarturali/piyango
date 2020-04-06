import {
  GameColumn,
  GameID,
  GAMES,
  NumbersPool,
  RegularGame,
} from '@caglarturali/piyango-common';
import { NumUtils } from './';

export class Random {
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
      const { main, plus } = this.game.pool;

      // Generate numbers.
      const col = {
        main: this.generateNumbers(main),
      } as GameColumn;

      if (plus) {
        col.plus = this.generateNumbers(plus);
      }

      guesses.push(col);
    }
    return guesses;
  }

  /**
   * Generates random numbers according to the given pool.
   * @param pool Pool object
   */
  private generateNumbers(pool: NumbersPool): number[] {
    const nums: number[] = [];
    const { from, select } = pool;

    // Create "pool" of numbers.
    const numPool = Array.from({ length: from }, (_, k: number) => k + 1);

    for (let j = 1; j <= select; j++) {
      NumUtils.shuffleNumbers(numPool);
      nums.push(numPool.pop() as number);
    }

    nums.sort((a, b) => a - b);
    return nums;
  }
}
