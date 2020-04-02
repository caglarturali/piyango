import { LotteryMatchType } from '.';

export interface LotteryCategory {
  haneSayisi: number;
  tip: LotteryMatchType;
  ikramiye: number;
  numaralar: string[];
}
