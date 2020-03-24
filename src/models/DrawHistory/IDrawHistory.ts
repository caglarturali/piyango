import { GameID } from '../Game';
import { DrawDate } from '../DrawDate';

export interface IDrawHistory {
  gameId: GameID;
  draws: DrawDate[];
}
