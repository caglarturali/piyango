import {
  DrawDate,
  GameID,
  NumFrequency,
  RegularGame,
  Selection,
} from '@caglarturali/piyango-common';
import { DateUtils, GameUtils } from '@caglarturali/piyango-utils';
import { IStats } from './IStats';
import db from '../../db';

/**
 * Statistics class that represents
 * a frequency report of numbers of a game.
 */
export default class Stats implements IStats {
  private gameId: GameID;

  lastDraw: DrawDate = '';
  numbers: {
    [num: string]: NumFrequency;
  } = {};

  constructor(gameId: GameID) {
    this.gameId = gameId;

    const game = GameUtils.getGameById(gameId);
    const { main, plus } = (game as RegularGame).pool;
    // Create entries for all numbers.
    for (let i = 1; i <= main.from; i++) {
      const numStr = this.numToStr(i);
      this.numbers[numStr] = {
        freq: 0,
      };
    }
    if (plus) {
      for (let i = 1; i <= plus.from; i++) {
        const numStr = this.numToStr(i, true);
        this.numbers[numStr] = {
          freq: 0,
        };
      }
    }
  }

  /**
   * Returns a new instance from a static report
   * that have already been created.
   * @param gameId Game ID
   */
  static fromDB(gameId: GameID): Stats {
    const stats = new Stats(gameId);

    const { lastDraw, numbers } = db[gameId].get('stats').value();

    // Hydrate the instance.
    stats.lastDraw = lastDraw;
    stats.numbers = numbers;

    return stats;
  }

  /**
   * Processes a column of numbers.
   * @param selection Game column
   * @param drawDate Draw date string
   */
  processSelection(selection: Selection, drawDate: DrawDate) {
    selection.main.forEach((num) => this.processNumber(num, drawDate));
    if (this.gameId === GameID.sanstopu && selection.plus) {
      selection.plus.forEach((plus) =>
        this.processNumber(plus, drawDate, true),
      );
    }
  }

  /**
   * Processes a single number.
   * @param num Number
   * @param drawDate Draw date string
   * @param isPlus If the number is belong to 'plus' pool or not
   */
  private processNumber(
    num: number,
    drawDate: DrawDate,
    isPlus: boolean = false,
  ) {
    const numStr = this.numToStr(num, isPlus);

    const { freq, last } = this.numbers[numStr];
    let lastDate;

    if (last) {
      lastDate = DateUtils.isGreaterThan(drawDate, last) ? drawDate : last;
    } else {
      lastDate = drawDate;
    }

    this.numbers[numStr] = {
      freq: freq + 1,
      last: lastDate,
    };

    if (!this.lastDraw || DateUtils.isGreaterThan(drawDate, this.lastDraw)) {
      this.lastDraw = drawDate;
    }
  }

  /**
   * Returns the string representation of the number.
   * @param num Number
   * @param isPlus Is plus or not
   */
  private numToStr(num: number, isPlus: boolean = false): string {
    let numStr = Number(num).toString().padStart(2, '0');

    // Prepend with plus if necessary.
    if (isPlus) numStr = `+${numStr}`;

    return numStr;
  }

  /**
   * Builds a prettified report w/o gameId field.
   */
  report(): string {
    const { lastDraw, numbers } = this;
    return JSON.stringify({ lastDraw, numbers }, null, 2);
  }

  /**
   * Writes the report into the db.
   */
  writeToDisk() {
    const { lastDraw, numbers } = this;
    db[this.gameId].set('stats', { lastDraw, numbers }).write();
  }
}
