import { PSnackbarProps } from '../../components/PSnackbar';
import { ActionType } from '../ActionType';

export interface GlobalState {
  theme: 'dark' | 'light';
  snackbar?: PSnackbarProps;
}

export interface GlobalAction {
  type: ActionType['global'];
  payload: Partial<GlobalState>;
}

export const initialState: GlobalState = {
  theme: 'light',
};
