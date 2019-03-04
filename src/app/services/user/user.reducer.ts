import { Action } from '@ngrx/store';
import { ActionTypes } from './user.actions';
 
export const initialState = {
    user: null
};
 
export function counterReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.SetUser:
      return { user: JSON.parse(localStorage.getItem('user'))};

    default:
      return state;
  }
}