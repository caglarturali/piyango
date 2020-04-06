import { LotteryMatch } from '.';

export interface LotteryCategory {
  haneSayisi: number;
  tip: LotteryMatch;
  ikramiye: number;
  numaralar: string[];
}
