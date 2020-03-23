import { MatchTypeLottery } from '.';
import { ICheckResult } from '../Game';

export interface LotteryCheck extends ICheckResult {
  type: MatchTypeLottery | null;
  digits: number | null;
  prize: number;
}
