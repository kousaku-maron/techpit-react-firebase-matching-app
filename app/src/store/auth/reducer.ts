import { StateType, initialState } from './state'
import { ActionType } from './action'

export const reducer: React.Reducer<StateType, ActionType> = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET_UID': {
      return {
        ...state,
        uid: action.payload,
      }
    }

    default: {
      return state
    }
  }
}
