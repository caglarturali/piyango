import { Reducer } from 'react';
import { GlobalAction, GlobalState, initialState } from './state';

export const reducer: Reducer<GlobalState, GlobalAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'setTheme':
      const { theme } = action.payload;
      return {
        ...state,
        theme: theme || state.theme,
      };

    case 'showSnackbar':
      const { snackbar } = action.payload;
      return {
        ...state,
        snackbar,
      };
    default:
      return state;
  }
};
