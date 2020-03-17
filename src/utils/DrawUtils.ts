import { GameID } from '../models/Game';
import RegularDraw from '../models/RegularDraw';
import { GameColumn } from '../models/GameColumn';

export default class DrawUtils {
  /**
   * Returns winning numbers as GameColumn object
   * @param gameId Game Id
   * @param drawDetails Draw details
   */
  static getWinningNumbers(
    gameId: GameID,
    drawDetails: RegularDraw,
  ): GameColumn {
    const winningNumbers: GameColumn = { main: [] };
    if (gameId === GameID.piyango) return winningNumbers;

    const { rakamlar } = drawDetails;

    // Convert rakamlar into array.
    const numsArray = rakamlar.split('#').map((n) => parseInt(n, 10));

    if (gameId === GameID.sanstopu) {
      const plus = numsArray.pop();
      winningNumbers.plus = plus ? [plus] : undefined;
    }

    // Sort the rest of the numbers.
    winningNumbers.main = numsArray.sort((a, b) => a - b);

    return winningNumbers;
  }
}
