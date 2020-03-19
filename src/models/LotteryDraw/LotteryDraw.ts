import LuckyProvince from '../LuckyProvince';
import { LotteryCategory } from './LotteryCategory';

/**
 * LotteryDraw interface.
 */
export default interface LotteryDraw {
  cekilisAdi: string;
  cekilisTarihi: string;
  cekilisTarihiRaw?: string;
  haneSayisi: number;
  sonuclar: LotteryCategory[];
  buyukIkrKazananIlIlceler: LuckyProvince[];
}
