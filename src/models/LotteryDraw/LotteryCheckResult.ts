import { MatchTypeLottery } from '.';

export interface LotteryCheckResult {
  type: MatchTypeLottery | null;
  digits: number | null;
  prize: number;
}
