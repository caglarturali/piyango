import { DrawDataType, GameID } from '@caglarturali/piyango-common';
import { ActionType } from '../ActionType';
import { CheckCouponProps } from '../../containers/CheckCoupon';

export interface DrawsState {
  draws: { [key in GameID]?: DrawDataType[] };
  checkcoupon?: CheckCouponProps;
}

export interface DrawsAction {
  type: ActionType['draws'];
  payload: Partial<DrawsState>;
}

export const initialState: DrawsState = {
  draws: {},
};
