import React, { createContext, useContext, useReducer } from 'react';
import {
  GlobalAction,
  GlobalState,
  initialState,
  reducer,
} from '../store/global';

type Dispatch = (action: GlobalAction) => void;

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);
const GlobalDispatchContext = createContext<Dispatch | undefined>(undefined);

export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const ctx = useContext(GlobalStateContext);
  if (ctx === undefined) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return ctx;
};

export const useGlobalDispatch = () => {
  const ctx = useContext(GlobalDispatchContext);
  if (ctx === undefined) {
    throw new Error('useGlobalDispatch must be used within a GlobalProvider');
  }
  return ctx;
};
