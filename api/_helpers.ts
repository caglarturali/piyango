import { GameID } from '../src/models/Game';
import { SortOrder } from '../src/models/SortOrder';

export const parseParam = {
  gameId: (val: any) => val.toString().toLowerCase() as GameID,
  str: (val: any) => val.toString().toLowerCase(),
  num: (val: any) => (val ? parseInt(val.toString(), 10) : undefined),
  sort: (val: any) =>
    val ? (val.toString().toLowerCase() as SortOrder) : undefined,
};
