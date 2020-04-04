import { Game, GameDrawDate, Pool } from '../Game';

/**
 * RegularGame interface.
 */
export interface RegularGame extends Game {
  columns: number;
  pool: Pool;
  drawDates: GameDrawDate[];
}
