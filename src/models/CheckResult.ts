import { MatchTypeRegular } from './RegularDraw';
import { GameColumn } from './GameColumn';

export interface CheckResult {
  type: MatchTypeRegular | null;
  match: GameColumn;
  prize: number;
}
