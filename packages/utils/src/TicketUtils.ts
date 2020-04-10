import {
  DrawDate,
  RegularDrawData,
  RegularGame,
  Selection,
  Ticket,
} from '@caglarturali/piyango-common';
import { RegularCheck } from './Check';

export class TicketUtils {
  private static readonly letters = 'ABCDEFGH';
  private game: RegularGame;
  private drawDate: DrawDate;
  private numbers: Selection[];

  constructor(game: RegularGame, drawDate: DrawDate, numbers: Selection[]) {
    this.game = game;
    this.drawDate = drawDate;
    this.numbers = numbers;
  }

  /**
   * Returns Selections as tickets.
   */
  tickets(): Ticket[] {
    const { game, drawDate } = this;
    const numsCopy = this.numbers.slice();
    const tickets: Ticket[] = [];

    while (numsCopy.length) {
      tickets.push({
        game,
        drawDate,
        numbers: numsCopy.splice(0, this.game.columns),
      });
    }

    return tickets;
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
   * Returns corresponding column key for given
   * selection index.
   * @param game Game
   * @param index Selection index.
   */
  static columnKey(game: RegularGame, index: number): string {
    return TicketUtils.letters[index % game.columns];
  }

  /**
   * Compares single ticket against given draw data.
   * @param ticket Ticket
   * @param drawData Regular draw data
   */
  static compareTicketAgainstDraw(ticket: Ticket, drawData: RegularDrawData) {
    const { game, numbers } = ticket;
    const check = RegularCheck.fromSelections(
      game as RegularGame,
      drawData,
      numbers,
    );
    check.validate();
    check.process();

    return check.results;
  }
}
