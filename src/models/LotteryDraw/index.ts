import LuckyProvince from '../LuckyProvince';
import { LotteryCategory } from './LotteryCategory';

export * from './LotteryCategory';
export * from './LotteryCheckResult';
export * from './MatchTypeLottery';

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
