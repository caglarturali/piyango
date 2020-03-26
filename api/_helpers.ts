import { GameID } from '../src/models/Game';
import { SortOrder } from '../src/models/SortOrder';
import { GAMES } from '../src/constants';
import { DateUtils } from '../src/utils';
import conf from '../src/apiconfig';

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
 * Function definition for query param validators.
 */
export type ParamValidator = (val: any) => boolean;

export interface ParamKit {
  parser: ParamParser;
  validator: ParamValidator;
  error: string;
  status?: number;
}

/**
 * Returns relevant "param kit" for a query param.
 * @param param Query param
 */
export const getParamKit = (param: QueryParam): ParamKit => {
  switch (param) {
    case 'gameId':
      return {
        parser: (val: any) => val.toString().toLowerCase() as GameID,
        validator: (val: any) => GAMES.some((game) => game.id === val),
        error: 'Game ID is not valid',
      };

    case 'date':
    case 'drawDate':
      return {
        parser: (val: any) => val.toString(),
        validator: (val: any) => {
          const valStr = val.toString();
          if (valStr.includes(conf.delimiter)) {
            for (const date of valStr.split(conf.delimiter)) {
              if (!DateUtils.isDateValid(date)) return false;
            }
            return true;
          }
          return DateUtils.isDateValid(valStr);
        },
        error: 'Date is not valid',
      };

    case 'limit':
    case 'skip':
    case 'col':
      return {
        parser: (val: any) => (val ? parseInt(val.toString(), 10) : undefined),
        validator: () => true,
        error: 'Number is not valid',
      };

    case 'sort':
      return {
        parser: (val: any) =>
          val ? (val.toString().toLowerCase() as SortOrder) : undefined,
        validator: (val: any) =>
          val === SortOrder.ASC || val === SortOrder.DESC,
        error: 'Sorting order is not valid',
      };

    default:
      return {
        parser: (val: any) => val.toString().toLowerCase(),
        validator: () => true,
        error: 'Unexpected error',
      };
  }
};
