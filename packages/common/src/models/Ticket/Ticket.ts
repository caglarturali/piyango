import { Column } from './Column';
import { Game } from '../Game';

export interface Ticket {
  game: Game;
  numbers: {
    [colName: string]: Column;
  };
}
