import {
  GameID,
  LotteryMatchMap,
  MatchText,
  MatchType,
  RegularMatchMap,
  Selection,
} from '@caglarturali/piyango-common';

export class DrawUtils {
  /**
   * Converts number string into a Selection object.
   * @param gameId Game Id
   * @param numsStr Numbers string
   */
  static convertNumbersToSelection(gameId: GameID, numsStr: string): Selection {
    const sel: Selection = { main: [] };

    // Convert numbers string into array.
    const numsArray = numsStr.split(/#|-|\+|_|,/).map((n) => parseInt(n, 10));

    if (gameId === GameID.sanstopu) {
      const plus = numsArray.pop();
      sel.plus = plus ? [plus] : undefined;
    }

    // Make sure there are no duplicate numbers and sort them.
    sel.main = Array.from(new Set(numsArray)).sort((a, b) => a - b);

    return sel;
  }

  /**
   * Stringfies the selection object.
   * @param gameId Game ID
   * @param selection Selection
   */
  static stringifySelection(gameId: GameID, selection: Selection): string {
    const { main, plus } = selection;

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
   * Returns MatchText equivalent of the matchType.
   * @param matchType Match type
   */
  static matchTypeToText(matchType: MatchType): MatchText {
    if (matchType in RegularMatchMap) return RegularMatchMap[matchType];
    if (matchType in LotteryMatchMap) return LotteryMatchMap[matchType];
    return { long: '' };
  }
}
