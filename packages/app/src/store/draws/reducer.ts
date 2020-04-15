import { Reducer } from 'react';
import { DrawsAction, DrawsState, initialState } from './state';

export const reducer: Reducer<DrawsState, DrawsAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'showCheckCoupon':
      const { checkcoupon } = action.payload;
      return {
        ...state,
        checkcoupon,
      };

    default:
      return state;
  }
};
