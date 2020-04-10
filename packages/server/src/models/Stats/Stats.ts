import {
  DrawDate,
  Game,
  GameID,
  GAMES,
  Selection,
} from '@caglarturali/piyango-common';
import { DateUtils } from '@caglarturali/piyango-utils';
import fs from 'fs';
import { PathUtils } from '../../utils';
import { NumFrequency } from './NumFrequency';

/**
 * Statistics class that represents
 * a frequency report of numbers of a game.
 */
export default class Stats {
  private gameId: GameID;

  lastDraw: DrawDate = '';
  numbers: {
    [num: string]: NumFrequency;
  } = {};

  constructor(gameId: GameID) {
    this.gameId = gameId;

    const game = GAMES.find((g) => g.id === gameId) as Game;
    const { main, plus } = game.pool;
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
  static fromFile(gameId: GameID): Stats {
    const stats = new Stats(gameId);

    const filePath = PathUtils.statsResourcePath(gameId);
    const { lastDraw = '', numbers = {} } = JSON.parse(
      fs.readFileSync(filePath).toString(),
    );

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
  processNumber(num: number, drawDate: DrawDate, isPlus: boolean = false) {
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
  numToStr(num: number, isPlus: boolean = false): string {
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
   * Writes the report into the disk.
   */
  writeToDisk() {
    const report = this.report();
    const filePath = PathUtils.statsResourcePath(this.gameId);
    fs.writeFileSync(filePath, report);
  }
}
