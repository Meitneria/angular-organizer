import { Action } from '@ngrx/store';
 
export enum ActionTypes {
  SetUser = '[Counter Component] Increment',
}
 
export class Increment implements Action {
  readonly type = ActionTypes.SetUser;
}