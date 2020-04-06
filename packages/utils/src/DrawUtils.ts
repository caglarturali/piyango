import {
  GameColumn,
  GameID,
  LotteryMatchTypeMap,
  MatchType,
  RegularMatchTypeMap,
} from '@caglarturali/piyango-common';

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

  /**
   * Stringfies the game column object.
   * @param gameId Game ID
   * @param column GameColumn
   */
  static stringifyColumn(gameId: GameID, column: GameColumn): string {
    const { main, plus } = column;

    let text = '';
    if (gameId === GameID.piyango) {
      text += main.join('');
    } else {
      text += main.map((n) => n.toString().padStart(2, '0')).join(' ');
      if (plus) {
        text += ' + ';
        text += plus.map((n) => n.toString().padStart(2, '0')).join(' ');
      }
    }
    return text;
  }

  /**
   * Returns the user-readable text corresponding to matchType.
   * @param matchType Match type
   */
  static matchTypeToString(matchType: MatchType): string {
    if (matchType in RegularMatchTypeMap) return RegularMatchTypeMap[matchType];
    if (matchType in LotteryMatchTypeMap) return LotteryMatchTypeMap[matchType];
    return '';
  }
}
