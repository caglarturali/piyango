import { GameColumn, GameID } from '../models/Game';

export class DrawUtils {
  /**
   * Converts number string into a GameColumn object.
   * @param gameId Game Id
   * @param numsStr Numbers string
   */
  static convertNumbersToColumn(gameId: GameID, numsStr: string): GameColumn {
    const column: GameColumn = { main: [] };

    // Convert numbers string into array.
    const numsArray = numsStr.split(/#|-|\+|_|,/).map((n) => parseInt(n, 10));

    if (gameId === GameID.sanstopu) {
      const plus = numsArray.pop();
      column.plus = plus ? [plus] : undefined;
    }

    // Make sure there are no duplicate numbers and sort them.
    column.main = Array.from(new Set(numsArray)).sort((a, b) => a - b);

    return column;
  }
}
