import { DrawData } from '../';
import LuckyProvince from '../LuckyProvince';
import { LotteryCategory } from './';

/**
 * LotteryDraw interface.
 */
export interface LotteryDrawData extends DrawData {
  cekilisAdi: string;
  cekilisTarihiRaw?: string;
  haneSayisi: number;
  sonuclar: LotteryCategory[];
  buyukIkrKazananIlIlceler: LuckyProvince[];
}
