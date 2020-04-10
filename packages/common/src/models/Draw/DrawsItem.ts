import { GameID } from '../Game';
import { DrawDataType } from './DrawDataType';

/**
 * Interface defines the items
 * returning from /draws
 */
export interface DrawsItem {
  id: GameID;
  data: DrawDataType;
}
