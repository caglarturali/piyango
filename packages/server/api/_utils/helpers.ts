import { GameID, GAMES } from '@caglarturali/piyango-common';
import { DateUtils } from '@caglarturali/piyango-utils';
import { SortOrder } from '../../src/models/SortOrder';
import { messages } from '../../src/constants';
import conf from '../../src/apiconfig';

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

export type ParamParser = (val: any) => any;
export type ParamValidator = (val: any) => boolean;
export type MessageBuilder = (val?: any) => string;

export interface ParamKit {
  parser: ParamParser;
  validator: ParamValidator;
  errorFn: MessageBuilder;
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
        errorFn: messages.invalidGameId,
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
        errorFn: messages.invalidDate,
      };

    case 'limit':
    case 'skip':
    case 'col':
      return {
        parser: (val: any) => (val ? parseInt(val.toString(), 10) : undefined),
        validator: () => true,
        errorFn: messages.invalidNumber,
      };

    case 'sort':
      return {
        parser: (val: any) =>
          val ? (val.toString().toLowerCase() as SortOrder) : undefined,
        validator: (val: any) =>
          val === SortOrder.ASC || val === SortOrder.DESC,
        errorFn: messages.invalidSort,
      };

    default:
      return {
        parser: (val: any) => val.toString().toLowerCase(),
        validator: () => true,
        errorFn: messages.unexpected,
      };
  }
};
