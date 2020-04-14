import { IAction } from '../IAction';

export interface GlobalState {
  theme: 'dark' | 'light';
}

export interface GlobalAction extends IAction {
  payload: {
    theme?: GlobalState['theme'];
  };
}

export const initialState: GlobalState = {
  theme: 'light',
};
