import { MatchTypeLottery } from '.';
import { CheckResult } from '../Game';

export interface LotteryCheck extends CheckResult {
  type: MatchTypeLottery | null;
  digits: number | null;
  prize: number;
}
