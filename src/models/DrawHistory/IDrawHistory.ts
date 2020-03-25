import { GameID } from '../Game';
import { DrawDate } from '../DrawDates';
import IResponse from '../IResponse';

export interface IDrawHistory extends IResponse {
  error?: string;
  gameId: GameID;
  draws: DrawDate[];
}
