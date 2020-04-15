import React, { createContext, useContext, useReducer } from 'react';
import { DrawsAction, DrawsState, initialState, reducer } from '../store/draws';

type Dispatch = (action: DrawsAction) => void;

const DrawsStateContext = createContext<DrawsState | undefined>(undefined);
const DrawsDispatchContext = createContext<Dispatch | undefined>(undefined);

const DrawsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DrawsStateContext.Provider value={state}>
      <DrawsDispatchContext.Provider value={dispatch}>
        {children}
      </DrawsDispatchContext.Provider>
    </DrawsStateContext.Provider>
  );
};

const useDrawsState = () => {
  const ctx = useContext(DrawsStateContext);
  if (ctx === undefined) {
    throw new Error('useDrawsState must be used within a DrawsProvider');
  }
  return ctx;
};

const useDrawsDispatch = () => {
  const ctx = useContext(DrawsDispatchContext);
  if (ctx === undefined) {
    throw new Error('useDrawsDispatch must be used within a DrawsProvider');
  }
  return ctx;
};

const useDraws = () => {
  return [useDrawsState(), useDrawsDispatch()];
};

export {
  DrawsStateContext,
  DrawsDispatchContext,
  DrawsProvider,
  useDrawsState,
  useDrawsDispatch,
  useDraws,
};
