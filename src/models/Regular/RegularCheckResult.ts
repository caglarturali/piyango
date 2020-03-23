import { MatchTypeRegular } from '.';
import { GameColumn } from './GameColumn';

export interface RegularCheckResult {
  type: MatchTypeRegular | null;
  match: GameColumn;
  prize: number;
}
