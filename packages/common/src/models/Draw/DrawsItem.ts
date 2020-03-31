import { GameID } from '../Game';
import { DrawDataType } from './';

/**
 * Interface defines the items
 * returning from /draws
 */
export interface DrawsItem {
  id: GameID;
  data: DrawDataType;
}
