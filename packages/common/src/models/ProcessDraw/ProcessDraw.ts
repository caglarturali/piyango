import moment, { Moment } from 'moment';
import { IProcessDraw } from './IProcessDraw';
import { GameColumn, GameID } from '../Game';
import { RegularDrawData } from '../Regular';
import { LotteryDrawData } from '../Lottery';
import { DrawDataType, LuckyProvince } from '../Draw';
import { DATE_FORMAT_FRIENDLY, DATE_FORMAT_VIEW } from '../../constants';
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

  /**
   * Returns draw date as a Moment object.
   */
  drawDate(): Moment {
    return moment(this.drawData.cekilisTarihi, DATE_FORMAT_FRIENDLY);
  }

  /**
   * Returns formatted draw date.
   * @param format Format string. DD-MM-YYYY by default.
   */
  drawDateF(format: string = DATE_FORMAT_VIEW): string {
    return this.drawDate().format(format);
  }

  /**
   * Returns rolling texts to be animated
   * below DrawDisplay comp.
   */
  rollingTexts(): string[] {
    const provinces = this.luckyProvinces();
    if (provinces.length > 0) {
      return provinces.map(({ ilView, ilceView }) => {
        const il = ilView.trim();
        const ilce = ilceView.trim();
        if (ilce === '') return il;
        return `${il} / ${ilce}`;
      });
    }
    const texts: string[] = ['Devretti!'];
    if (this.gameId !== GameID.piyango) {
      const { devirSayisi } = this.drawData as RegularDrawData;
      if (devirSayisi) {
        texts.push(`${devirSayisi}. Devir`);
      }
    }
    return texts;
  }
}
