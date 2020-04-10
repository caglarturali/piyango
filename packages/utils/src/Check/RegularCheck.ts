import {
  CheckResult,
  GameID,
  RegularDrawData,
  RegularGame,
  RegularMatch,
  Selection,
} from '@caglarturali/piyango-common';
import { ProcessDraw } from '../ProcessDraw';
import { ICheckNumbers } from '.';
import { DrawUtils } from '../';

export default class RegularCheck implements ICheckNumbers {
  private game: RegularGame;
  private drawData: RegularDrawData;
  private userNumbers: Selection[];
  private winningNumbers: Selection;

  private matches: Selection[] = [];
  results: CheckResult[] = [];

  constructor(game: RegularGame, drawData: RegularDrawData, numbers: string[]) {
    this.game = game;
    this.drawData = drawData;

    // Convert string of numbers to Selection objects.
    this.userNumbers = numbers.length
      ? numbers.map((numsStr) =>
          DrawUtils.convertNumbersToSelection(game.id, numsStr),
        )
      : [];
    this.winningNumbers = new ProcessDraw<RegularDrawData>(
      game.id,
      drawData,
    ).winningNumbers();
  }

  /**
   * Returns a new instance from Selection objects,
   * instead of from numbers array.
   * @param game Game
   * @param drawData Regular draw data
   * @param selections User numbers in Selection[] form
   */
  static fromSelections(
    game: RegularGame,
    drawData: RegularDrawData,
    selections: Selection[],
  ) {
    const instance = new this(game, drawData, []);
    instance.userNumbers = selections;
    return instance;
  }

  /**
   * Validates the length of the numbers.
   */
  validate(): boolean {
    for (const { main, plus } of this.userNumbers) {
      const { main: mainPool, plus: plusPool } = this.game.pool;

      if (main.length !== mainPool.select) {
        return false;
      }
      if (this.game.id === GameID.sanstopu) {
        if (plus?.length !== plusPool?.select) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Processes data given and populates
   * necessary fields.
   */
  process() {
    this.checkMatches();
    this.report();
  }

  /**
   * Compares user numbers againsts winningNumbers.
   */
  private checkMatches() {
    this.matches = [];
    this.userNumbers.forEach((col) => {
      this.matches.push(RegularCheck.checkMatch(col, this.winningNumbers));
    });
  }

  /**
   * Computes results and store them into "results" field.
   */
  private report() {
    this.results = [];
    const { bilenKisiler } = this.drawData;

    this.matches.forEach((match) => {
      let matchTypeStr: string = '$';

      switch (this.game.id) {
        case GameID.onnumara:
          if (match.main.length === 0) {
            // Override!
            matchTypeStr = RegularMatch.$HIC;
          } else {
            matchTypeStr += `${match.main.length}_BILEN`;
          }
          break;

        case GameID.sanstopu:
          matchTypeStr += `${match.main.length}_`;
          matchTypeStr += match.plus?.length ? `${match.plus.length}_` : '';
          matchTypeStr += 'BILEN';
          break;

        default:
          matchTypeStr += `${match.main.length}_BILEN`;
          break;
      }

      // Try to find a match.
      const winnerCat = bilenKisiler.find((w) => w.tur === matchTypeStr);

      if (!winnerCat) {
        this.results.push({
          type: null,
          match,
          prize: 0,
        });
        return;
      }

      const { tur, kisiBasinaDusenIkramiye } = winnerCat;
      this.results.push({
        type: DrawUtils.matchTypeToText(tur),
        match,
        prize: kisiBasinaDusenIkramiye,
      });
    });
  }

  /**
   * Checks a single selection against winning numbers.
   * @param selection Selection of numbers
   * @param winningNumbers Winning numbers
   */
  static checkMatch(selection: Selection, winningNumbers: Selection) {
    const numsMatch: Selection = { main: [] };

    const compare = (key: keyof Selection) => {
      selection[key]?.forEach((num: number) => {
        if (winningNumbers[key]?.includes(num)) {
          numsMatch[key]?.push(num);
        }
      });
    };

    compare('main');
    if (winningNumbers.plus) {
      numsMatch.plus = [];
      compare('plus');
    }
    return numsMatch;
  }
}
