import { DrawDate, GameID } from '@caglarturali/piyango-common';
import Response from '../Response';

export interface DrawHistoryData extends Response {
  error?: string;
  gameId: GameID;
  draws: DrawDate[];
}
