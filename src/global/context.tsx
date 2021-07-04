import React, { createContext, useContext, useReducer } from 'react';
import { IUser } from '../models/apiModels';

const StateContext = createContext(null);

export interface AppState {
  allUsers: IUser[]
}

type StateProviderProps = {
  reducer: any;
  initialState: AppState;
  children: any;
};

export const StateProvider = ({
  reducer,
  initialState,
  children,
}: StateProviderProps) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue= () => useContext<[AppState, any]>(StateContext);
