import { Action } from "@ngrx/store";

// be careful as those identifiers are reachable by all reducers in the entire app...
// have to be unique
export const LOGIN_START = "[Auth] Login Start";
export const AUTHENTICATE_SUCCESS = "[Auth] Login";
export const LOGOUT = "[Auth] Logout";
export const AUTHENTICATE_FAIL = "[Auth] Login Fail";
export const SIGNUP_START = "[Auth] Signup Start";
export const CLEAR_ERROR = "[Auth] Error";

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

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

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignupStart
  | ClearError;
