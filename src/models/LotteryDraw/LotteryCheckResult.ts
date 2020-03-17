import { MatchTypeLottery } from '.';

export interface Lottery {
  type: MatchTypeLottery | null;
  match: any;
  prize: number;
}
