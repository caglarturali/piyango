import { IDrawData } from '../Draw';
import LuckyProvince from '../LuckyProvince';
import { LotteryCategory } from './LotteryCategory';

/**
 * LotteryDraw interface.
 */
export interface ILotteryDrawData extends IDrawData {
  cekilisAdi: string;
  cekilisTarihiRaw?: string;
  haneSayisi: number;
  sonuclar: LotteryCategory[];
  buyukIkrKazananIlIlceler: LuckyProvince[];
}
