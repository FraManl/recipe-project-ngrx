import { User } from "../user.model";
import * as AuthActions from "./auth.action";

// in the reducer, we use the actions

// define how the state should look like for auth
export interface State {
  user: User;
  authError: string;
  // loading managed in the NGRX state, ngrx very useful to manage stuffs such as loading states aswell...
  // prevent from doing a lot of error .. in the configuration of the UI
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      // build the user object, the payload comes from the action
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      // remember, don't have to emit anymore, just need to return this inside the state
      // copy old state,then overwrite everything we need to overwrite
      return { ...state, authError: null, user: user, loading: false };

    case AuthActions.LOGOUT:
      return { ...state, user: null };

    case AuthActions.LOGIN_START:
    // with reducers, very easy to club multiple actions and assign to them specific behaviors in the UI, such as loading spinners...
    case AuthActions.SIGNUP_START:
      return { ...state, authError: null, loading: true };

    case AuthActions.AUTO_LOGIN:
      return {};

    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };

    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };

    // very important
    default:
      return state;
  }
}
