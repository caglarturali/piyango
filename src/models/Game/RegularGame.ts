import Game, { GameDrawDate, NumbersPool } from '.';

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
