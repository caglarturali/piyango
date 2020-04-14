import { GlobalAction, GlobalState } from './state';
import { ActionType } from '../ActionType';
import { PSnackbarProps } from '../../components/PSnackbar';

export const setTheme = (theme: GlobalState['theme']): GlobalAction => ({
  type: ActionType.SetTheme,
  payload: {
    theme,
  },
});

export const showSnackbar = (snackbar: PSnackbarProps): GlobalAction => ({
  type: ActionType.ShowSnackbar,
  payload: {
    snackbar,
  },
});
