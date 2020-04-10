import { LotteryMatch } from './LotteryMatch';

export interface LotteryCategory {
  haneSayisi: number;
  tip: LotteryMatch;
  ikramiye: number;
  numaralar: string[];
}
