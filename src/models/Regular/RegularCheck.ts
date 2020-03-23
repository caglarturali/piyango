import { MatchTypeRegular } from '.';
import { GameColumn } from './GameColumn';
import { CheckResult } from '../Game';

export interface RegularCheck extends CheckResult {
  type: MatchTypeRegular | null;
  match: GameColumn;
  prize: number;
}
