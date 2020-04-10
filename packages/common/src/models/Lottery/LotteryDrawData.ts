import { DrawData } from '../Draw';
import { LotteryCategory } from './LotteryCategory';

/**
 * LotteryDraw interface.
 */
export interface LotteryDrawData extends DrawData {
  cekilisAdi: string;
  cekilisTarihiRaw?: string;
  haneSayisi: number;
  sonuclar: LotteryCategory[];
}
