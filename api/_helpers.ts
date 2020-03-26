import { GameID } from '../src/models/Game';
import { SortOrder } from '../src/models/SortOrder';

/**
 * Supported query parameters.
 */
export type QueryParam =
  | 'gameId'
  | 'date'
  | 'drawDate'
  | 'limit'
  | 'skip'
  | 'col'
  | 'sort';

/**
 * Function definition for query param parsers.
 */
export type ParamParser = (val: any) => any;

/**
 * Returns relevant parser for a query param.
 * @param param Query param
 */
export const getParserForParam = (param: QueryParam): ParamParser => {
  switch (param) {
    case 'gameId':
      return (val: any) => val.toString().toLowerCase() as GameID;

    case 'limit':
    case 'skip':
    case 'col':
      return (val: any) => (val ? parseInt(val.toString(), 10) : undefined);

    case 'sort':
      return (val: any) =>
        val ? (val.toString().toLowerCase() as SortOrder) : undefined;

    default:
      return (val: any) => val.toString().toLowerCase();
  }
};
