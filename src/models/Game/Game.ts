import { GameID } from '.';

/**
 * Base game definiton.
 */
export interface Game {
  id: GameID;
  name: string;
  embedSlug?: string;
  [key: string]: any;
}
