import { Game } from '../Game';
import { DrawDate } from '../Draw';
import { Selection } from './Selection';

export interface Ticket {
  game: Game;
  drawDate: DrawDate;
  numbers: Selection[];
}
