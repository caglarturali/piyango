import { MatchTypeLottery } from '.';

export interface LotteryCheckResult {
  type: MatchTypeLottery | null;
  match: any;
  prize: number;
}
