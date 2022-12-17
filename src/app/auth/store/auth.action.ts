import { Action } from "@ngrx/store";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export class Login implements Action {
  readonly type = LOGIN;

  // this is one way of doing it... only the only way, can also create the user before dispatching inside the action; here we make the reducer work more
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  // just set user to null
}

export type AuthActions = Login | Logout;
