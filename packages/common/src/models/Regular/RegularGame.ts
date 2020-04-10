import { Game, Pool } from '../Game';
import { GameDrawDate } from './GameDrawDate';

/**
 * RegularGame interface.
 */
export interface RegularGame extends Game {
  columns: number;
  pool: Pool;
  drawDates: GameDrawDate[];
}
