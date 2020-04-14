import { IAction } from '../IAction';
import { PSnackbarProps } from '../../components/PSnackbar';

export interface GlobalState {
  theme: 'dark' | 'light';
  snackbar?: PSnackbarProps;
}

export interface GlobalAction extends IAction {
  payload: {
    theme?: GlobalState['theme'];
    snackbar?: PSnackbarProps;
  };
}

export const initialState: GlobalState = {
  theme: 'light',
};
