import { Reducer } from 'react';
import { GlobalAction, GlobalState, initialState } from './state';
import { ActionType } from '../ActionType';

export const reducer: Reducer<GlobalState, GlobalAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ActionType.SetTheme:
      const { theme } = action.payload;
      return {
        ...state,
        theme: theme || state.theme,
      };

    case ActionType.ShowSnackbar:
      const { snackbar } = action.payload;
      return {
        ...state,
        snackbar,
      };
    default:
      return state;
  }
};
