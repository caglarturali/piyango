import { Column, RegularGame, Ticket } from '@caglarturali/piyango-common';

export class TicketUtils {
  private readonly letters = 'ABCDEFGH';
  private game: RegularGame;
  private cols: Column[];

  constructor(game: RegularGame, columns: Column[]) {
    this.game = game;
    this.cols = columns;
  }

  /**
   * Returns Columns as tickets.
   */
  tickets(): Ticket[] {
    const colsCopy = this.cols.slice();
    const chunks: Column[][] = [];

    while (colsCopy.length) {
      chunks.push(colsCopy.splice(0, this.game.columns));
    }

    return chunks.map(
      (chunk) =>
        ({
          game: this.game,
          numbers: this.arrayToObjectMap(chunk),
        } as Ticket),
    );
  }

  /**
   * Converts Columns array into string indexed object.
   * @param arr Array of Column objects
   */
  private arrayToObjectMap(arr: Column[]) {
    const obj: { [key: string]: Column } = {};
    arr.forEach((col, i) => {
      const colName = this.letters[i % this.game.columns];
      obj[colName] = col;
    });
    return obj;
  }
}
