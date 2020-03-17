import { GameID } from '../models/Game';
import RegularDraw from '../models/RegularDraw';
import { GameColumn } from '../models/GameColumn';

export default class DrawUtils {
  /**
   * Converts number string into a GameColumn object.
   * @param gameId Game Id
   * @param numbers Numbers string
   */
  static convertNumbersToColumn(gameId: GameID, numbers: string): GameColumn {
    const column: GameColumn = { main: [] };

    // Convert numbers string into array.
    const numsArray = numbers.split(/#|-|\+|_/).map((n) => parseInt(n, 10));

    if (gameId === GameID.sanstopu) {
      const plus = numsArray.pop();
      column.plus = plus ? [plus] : undefined;
    }

    // Sort the rest of the numbers.
    column.main = numsArray.sort((a, b) => a - b);

    return column;
  }

  /**
   * Returns winning numbers as GameColumn object
   * @param gameId Game Id
   * @param drawDetails Draw details
   */
  static getWinningNumbers(
    gameId: GameID,
    drawDetails: RegularDraw,
  ): GameColumn {
    if (gameId === GameID.piyango) return { main: [] };
    const { rakamlar } = drawDetails;
    return this.convertNumbersToColumn(gameId, rakamlar);
  }
}
