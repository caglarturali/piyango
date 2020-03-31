import { DrawDataType, GameID } from 'packages/common/esm';

/**
 * Interface defines the items
 * returning from /draws
 */
export interface DrawsItem {
  id: GameID;
  data: DrawDataType;
}
