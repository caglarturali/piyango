import { GameID } from './GameID';

/**
 * Base game definiton.
 */
export interface Game {
  id: GameID;
  name: string;
  iconText: string;
  embedSlug?: string;
  [key: string]: any;
}
