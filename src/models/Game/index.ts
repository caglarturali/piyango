import { GameDrawDate, GameID, NumbersPool } from '.';

export * from './GameDrawDate';
export * from './GameID';
export * from './NumbersPool';

/**
 * Game interface.
 */
export default interface Game {
  id: GameID;
  name: string;
  embedSlug?: string;
  columns?: number;
  pool?: {
    main: NumbersPool;
    plus?: NumbersPool;
  };
  drawDates?: GameDrawDate[];
  lottery?: boolean;
}
