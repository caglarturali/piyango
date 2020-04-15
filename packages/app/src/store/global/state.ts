import { PSnackbarProps } from '../../components/PSnackbar';
import { ActionType } from '../ActionType';

export interface GlobalState {
  theme: 'dark' | 'light';
  snackbar?: PSnackbarProps;
}

export interface GlobalAction {
  type: ActionType['global'];
  payload: {
    theme?: GlobalState['theme'];
    snackbar?: PSnackbarProps;
  };
}

export const initialState: GlobalState = {
  theme: 'light',
};
