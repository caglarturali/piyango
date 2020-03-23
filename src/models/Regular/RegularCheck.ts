import { MatchTypeRegular } from '.';
import { GameColumn } from './GameColumn';
import { GameID, ICheckNumbers, ICheckResult } from '../Game';
import { DrawUtils } from '../../utils';
import { RegularDraw } from './RegularDraw';
import { RegularGame } from './RegularGame';

export class RegularCheck implements ICheckNumbers {
  private userNumbers: GameColumn[];
  private winningNumbers: GameColumn;
  private game: RegularGame;
  private drawData: RegularDraw;

  private matches: GameColumn[] = [];
  results: ICheckResult[] = [];

  constructor(game: RegularGame, drawData: RegularDraw, numbers: string[]) {
    this.game = game;
    this.drawData = drawData;

    // Convert string of numbers to GameColumn objects.
    this.userNumbers = numbers.map((numsStr) =>
      DrawUtils.convertNumbersToColumn(game.id, numsStr),
    );
    this.winningNumbers = DrawUtils.getWinningNumbers(game.id, drawData);
  }

  /**
   * Validates the length of the numbers.
   */
  validate(): boolean {
    let columnsValid = true;
    this.userNumbers.forEach(({ main, plus }) => {
      const { main: mainPool, plus: plusPool } = this.game.pool;

      if (main.length !== mainPool.select) {
        columnsValid = false;
      }
      if (
        this.game.id === GameID.sanstopu &&
        plus?.length !== plusPool?.select
      ) {
        columnsValid = false;
      }
    });
    return columnsValid;
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

      main.forEach((num) => {
        if (this.winningNumbers.main.includes(num)) {
          numsMatch.main.push(num);
        }
      });

      if (this.game.id === GameID.sanstopu) {
        numsMatch.plus = [];
        plus?.forEach((num) => {
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
            matchTypeStr = MatchTypeRegular.$HIC;
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
