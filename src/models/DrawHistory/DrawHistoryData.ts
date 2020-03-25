import { GameID } from '../Game';
import { DrawDate } from '../DrawDates';
import Response from '../Response';

export interface DrawHistoryData extends Response {
  error?: string;
  gameId: GameID;
  draws: DrawDate[];
}
