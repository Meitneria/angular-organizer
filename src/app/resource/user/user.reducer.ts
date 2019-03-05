import { Action } from '@ngrx/store';
import { ActionTypes } from './user.actions';
 
export const initialState = {
    user: null
};
 
export function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.SetUser:
      return { user: action.payload.user};

    default:
      return state;
  }
}