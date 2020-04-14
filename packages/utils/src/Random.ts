import _ from 'lodash';
import {
  GameID,
  GAMES,
  NumbersPool,
  RegularGame,
  Selection,
} from '@caglarturali/piyango-common';

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
   * @returns Array of Selection objects
   */
  generate(): Selection[] {
    const guesses: Selection[] = [];

    for (let i = 1; i <= this.colCount; i++) {
      const { main, plus } = this.game.pool;

      // Generate numbers.
      const sel = {
        main: this.generateNumbers(main),
      } as Selection;

      if (plus) {
        sel.plus = this.generateNumbers(plus);
      }

      guesses.push(sel);
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
    let numPool = _.range(1, from + 1);

    for (let j = 1; j <= select; j++) {
      numPool = _.shuffle(numPool);
      nums.push(numPool.pop() as number);
    }

    nums.sort((a, b) => a - b);
    return nums;
  }
}
