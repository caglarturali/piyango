import {
  Column,
  RegularDrawData,
  RegularGame,
  Ticket,
} from '@caglarturali/piyango-common';
import { RegularCheck } from './Check';

export class TicketUtils {
  private static readonly letters = 'ABCDEFGH';
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
          numbers: TicketUtils.arrayToObjectMap(this.game, chunk),
        } as Ticket),
    );
  }

  /**
   * Compares tickets against given draw data.
   * @param drawData Regular draw data
   */
  compareAgainstDraw(drawData: RegularDrawData) {
    const tickets = this.tickets();
    return tickets.map((ticket) =>
      TicketUtils.compareTicketAgainstDraw(ticket, drawData),
    );
  }

  /**
   * Compares single ticket against given draw data.
   * @param ticket Ticket
   * @param drawData Regular draw data
   */
  static compareTicketAgainstDraw(ticket: Ticket, drawData: RegularDrawData) {
    const { game, numbers } = ticket;
    const cols = TicketUtils.objectToArrayMap(numbers);
    const check = RegularCheck.fromColumns(game as RegularGame, drawData, cols);
    check.validate();
    check.process();

    return {
      ticket,
      results: check.results,
    };
  }

  /**
   * Converts Columns array into string indexed object.
   * @param game Regular game object
   * @param arr Array of Column objects
   */
  static arrayToObjectMap(game: RegularGame, arr: Column[]) {
    const obj: { [key: string]: Column } = {};
    arr.forEach((col, i) => {
      const colName = TicketUtils.letters[i % game.columns];
      obj[colName] = col;
    });
    return obj;
  }

  /**
   * Converts string indexed object into Columns array.
   * @param obj Object of Columns
   */
  static objectToArrayMap(obj: { [colName: string]: Column }) {
    const cols: Column[] = [];
    for (const colName in obj) {
      if (obj.hasOwnProperty(colName)) {
        cols.push(obj[colName]);
      }
    }
    return cols;
  }
}
