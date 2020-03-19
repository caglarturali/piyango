import Draw from '../Draw';
import LuckyProvince from '../LuckyProvince';
import { LotteryCategory } from './LotteryCategory';

/**
 * LotteryDraw interface.
 */
export default interface LotteryDraw extends Draw {
  cekilisAdi: string;
  cekilisTarihiRaw?: string;
  haneSayisi: number;
  sonuclar: LotteryCategory[];
  buyukIkrKazananIlIlceler: LuckyProvince[];
}
