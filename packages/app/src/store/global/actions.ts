import { GlobalAction, GlobalState } from './state';
import { ActionType } from '../ActionType';

export const setTheme = (theme: GlobalState['theme']): GlobalAction => ({
  type: ActionType.SetTheme,
  payload: {
    theme,
  },
});
