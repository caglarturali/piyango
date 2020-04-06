import { DrawUtils } from '@caglarturali/piyango-utils';
import { GameColumn, GameID } from '../Game';
import { ProcessDraw } from '../ProcessDraw';
import { RegularDrawData, RegularGame, RegularMatch } from '../Regular';
import { CheckResult, ICheckNumbers } from '.';

export default class RegularCheck implements ICheckNumbers {
  private game: RegularGame;
  private drawData: RegularDrawData;
  private userNumbers: GameColumn[];
  private winningNumbers: GameColumn;

  private matches: GameColumn[] = [];
  results: CheckResult[] = [];

  constructor(game: RegularGame, drawData: RegularDrawData, numbers: string[]) {
    this.game = game;
    this.drawData = drawData;

    // Convert string of numbers to GameColumn objects.
    this.userNumbers = numbers.length
      ? numbers.map((numsStr) =>
          DrawUtils.convertNumbersToColumn(game.id, numsStr),
        )
      : [];
    this.winningNumbers = new ProcessDraw<RegularDrawData>(
      game.id,
      drawData,
    ).winningNumbers();
  }

  /**
   * Returns a new instance from GameColumn objects,
   * instead of from numbers array.
   * @param game Game
   * @param drawData Regular draw data
   * @param columns User numbers in GameColumn[] form
   */
  static fromGameColumns(
    game: RegularGame,
    drawData: RegularDrawData,
    columns: GameColumn[],
  ) {
    const instance = new this(game, drawData, []);
    instance.userNumbers = columns;
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
    this.userNumbers.forEach(({ main, plus }) => {
      const numsMatch: GameColumn = { main: [] };

      main.forEach((num: number) => {
        if (this.winningNumbers.main.includes(num)) {
          numsMatch.main.push(num);
        }
      });

      if (this.game.id === GameID.sanstopu) {
        numsMatch.plus = [];
        plus?.forEach((num: number) => {
          if (this.winningNumbers.plus?.includes(num)) {
            numsMatch.plus?.push(num);
          }
        });
      }

      this.matches.push(numsMatch);
    });
  }

  /**
   * Computes results and store them into "results" field.
   */
  private report() {
    const { bilenKisiler } = this.drawData;

    this.matches.forEach((match) => {
      let matchTypeStr: string = '$';

      switch (this.game.id) {
        case GameID.onnumara:
          if (match.main.length === 0) {
            // Override!
            matchTypeStr = RegularMatch.$HIC;
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

      this.results.push({
        type: winnerCat ? matchTypeStr : null,
        match,
        prize: winnerCat ? winnerCat.kisiBasinaDusenIkramiye : 0,
      });
    });
  }
}
