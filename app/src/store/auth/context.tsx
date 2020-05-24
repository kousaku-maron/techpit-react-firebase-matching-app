import React, { useContext, useCallback, useReducer, Dispatch } from 'react'
import { ActionType } from './action'
import { initialState, StateType } from './state'
import { reducer } from './reducer'

export const StateContext = React.createContext<StateType>(null as any)
export const DispatchContext = React.createContext<Dispatch<ActionType>>(null as any)

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useAuthState = () => {
  const state = useContext(StateContext)
  return state
}

export const useAuthDispatch = () => {
  const dispatch = useContext(DispatchContext)

  const setUID = useCallback(
    (uid: string | null) => {
      dispatch({ type: 'SET_UID', payload: uid })
    },
    [dispatch]
  )

  return { setUID }
}
