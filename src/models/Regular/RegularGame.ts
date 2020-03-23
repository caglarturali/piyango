import Game, { GameDrawDate, NumbersPool } from '../Game';

/**
 * RegularGame interface.
 */
export interface RegularGame extends Game {
  columns: number;
  pool: {
    [index: string]: NumbersPool | undefined;
    main: NumbersPool;
    plus?: NumbersPool;
  };
  drawDates: GameDrawDate[];
}
