import { LotteryCategory, LotteryDrawData, LotteryGame } from '../Lottery';
import { CheckResult, ICheckNumbers } from '.';

export default class LotteryCheck implements ICheckNumbers {
  private game: LotteryGame;
  private numbers: string[];
  private drawData: LotteryDrawData;

  results: CheckResult[] = [];

  constructor(game: LotteryGame, drawData: LotteryDrawData, numbers: string[]) {
    this.game = game;
    this.drawData = drawData;
    this.numbers = numbers;
  }

  /**
   * Validates ticket numbers.
   */
  validate(): boolean {
    const { haneSayisi: digits } = this.drawData;

    for (const num of this.numbers) {
      if (num.length !== digits) {
        return false;
      }
    }
    return true;
  }

  /**
   * Processes data given and populates
   * necessary fields.
   */
  process() {
    this.report();
  }

  /**
   * Computes results and store them into "results" field.
   */
  private report() {
    const { sonuclar } = this.drawData;

    const teselli = sonuclar.find((s) => s.haneSayisi === 0) as LotteryCategory;
    const rest = sonuclar
      .filter((s) => s.haneSayisi > 0)
      .sort((a, b) => a.haneSayisi - b.haneSayisi);

    // Compare numbers against categories.
    this.numbers.forEach((num) => {
      let result: CheckResult = { type: null, digits: null, prize: 0 };

      // Check "teselli" first.
      if (teselli.numaralar.includes(num)) {
        result = {
          type: teselli.tip,
          digits: teselli.haneSayisi,
          prize: teselli.ikramiye,
        };

        return this.results.push(result);
      }

      // Check the rest.
      // Keep evaluating categories until the biggest match
      // is found and only add that match to the results.
      rest.forEach((category) => {
        const numToCheck = num.substring(num.length - category.haneSayisi);

        if (category.numaralar.includes(numToCheck)) {
          result = {
            type: category.tip,
            digits: category.haneSayisi,
            prize: category.ikramiye,
          };
        }
      });

      this.results.push(result);
    });
  }
}
