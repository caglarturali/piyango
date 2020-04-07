import moment, { Moment } from 'moment';
import {
  Column,
  DateFormat,
  DrawDataType,
  Game,
  GameID,
  LotteryDrawData,
  LotteryReportLine,
  LuckyProvince,
  RegularDrawData,
  RegularReportLine,
  ReportLineType,
} from '@caglarturali/piyango-common';
import { DrawUtils, GameUtils } from './';

export class ProcessDraw<T extends DrawDataType> {
  private gameId: GameID;
  private game: Game;
  private drawData: DrawDataType;

  constructor(gameId: GameID, drawData: T) {
    this.gameId = gameId;
    this.game = GameUtils.getGameById(gameId);
    this.drawData = drawData;
  }

  /**
   * Returns winning numbers as Column object.
   */
  winningNumbers(): Column {
    if (this.gameId === GameID.piyango) {
      const {
        sonuclar: [jackpot],
      } = this.drawData as LotteryDrawData;
      const nums = jackpot.numaralar[0].split('').map((s) => parseInt(s, 10));
      return { main: nums } as Column;
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
    return moment(this.drawData.cekilisTarihi, DateFormat.FRIENDLY);
  }

  /**
   * Returns formatted draw date.
   * @param format Format string. DD-MM-YYYY by default.
   */
  drawDateF(format: string = DateFormat.URL): string {
    return this.drawDate().format(format);
  }

  /**
   * Returns a detailed report of the draw in array form.
   */
  report(): ReportLineType[] {
    let report: ReportLineType[];
    if (this.gameId === GameID.piyango) {
      const { sonuclar } = this.drawData as LotteryDrawData;
      report = sonuclar.map(
        ({ tip, ikramiye, numaralar }) =>
          ({
            type: DrawUtils.matchTypeToText(tip).long,
            prize: ikramiye,
            winningNumbers: numaralar,
          } as LotteryReportLine),
      );
    } else {
      const { bilenKisiler } = this.drawData as RegularDrawData;
      report = bilenKisiler.map(
        ({ tur, kisiBasinaDusenIkramiye, kisiSayisi }) =>
          ({
            type: DrawUtils.matchTypeToText(tur).long,
            prize: kisiBasinaDusenIkramiye,
            winnersCount: kisiSayisi,
          } as RegularReportLine),
      );
    }
    return report.sort((a, b) => b.prize - a.prize);
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
    const texts: string[] = [];
    if (this.gameId !== GameID.piyango) {
      const { archived, devretti, devirSayisi } = this
        .drawData as RegularDrawData;
      if (archived) texts.push('[Arşiv Verisi]');
      if (devretti) texts.push('Devretti!');
      if (devirSayisi) texts.push(`${devirSayisi}. Devir`);
    }
    return texts;
  }

  /**
   * Returns the winning numbers as text.
   */
  summary(): string {
    const { id } = this.game;
    return DrawUtils.stringifyColumn(id, this.winningNumbers());
  }

  /**
   * Returns the summary of the draw
   * for to be used as clipboard text.
   */
  clipboard(): string {
    const { name } = this.game;
    const { cekilisTarihi } = this.drawData;
    return `${name} - ${cekilisTarihi}: ${this.summary()}`;
  }
}
