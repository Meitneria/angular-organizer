import { Action } from '@ngrx/store';
 
export enum ActionTypes {
  SetUser = 'SetUser',
}
 
export class SetUser implements Action {
  readonly type = ActionTypes.SetUser;
  constructor(public payload: { user: any }) {}
}