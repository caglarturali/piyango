import { IProcessDraw } from './IProcessDraw';
import { GameColumn, GameID } from '../Game';
import { RegularDrawData } from '../Regular';
import { LotteryDrawData } from '../Lottery';
import { DrawDataType, LuckyProvince } from '../Draw';
import { DrawUtils } from '../../utils';

export class ProcessDraw<T extends DrawDataType> implements IProcessDraw {
  private gameId: GameID;
  private drawData: DrawDataType;

  constructor(gameId: GameID, drawData: T) {
    this.gameId = gameId;
    this.drawData = drawData;
  }

  /**
   * Returns winning numbers as GameColumn object.
   */
  winningNumbers(): GameColumn {
    if (this.gameId === GameID.piyango) {
      const {
        sonuclar: [jackpot],
      } = this.drawData as LotteryDrawData;
      const nums = jackpot.numaralar[0].split('').map((s) => parseInt(s, 10));
      return { main: nums } as GameColumn;
    }

    const { rakamlar } = this.drawData as RegularDrawData;
    return DrawUtils.convertNumbersToColumn(this.gameId, rakamlar);
  }

  /**
   * Returns jackpot amount.
   */
  jackpot(): number {
    if (this.gameId === GameID.piyango) {
      const {
        sonuclar: [jackpot],
      } = this.drawData as LotteryDrawData;
      return jackpot.ikramiye;
    }

    const drawData = this.drawData as RegularDrawData;
    return drawData.buyukIkramiye + drawData.devirTutari;
  }

  /**
   * Returns winning places as an array.
   */
  luckyProvinces(): LuckyProvince[] {
    return this.drawData.buyukIkrKazananIlIlceler || [];
  }
}
