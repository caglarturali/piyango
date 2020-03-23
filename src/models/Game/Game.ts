import { GameID } from '.';

/**
 * Base game definiton.
 */
export default interface Game {
  id: GameID;
  name: string;
  embedSlug?: string;
  [key: string]: any;
}
