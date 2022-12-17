import { User } from "../user.model";
import * as AuthActions from "./auth.action";

// in the reducer, we use the actions

// define how the state should look like for auth
export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      // build the user object, the payload comes from the action
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      // remember, don't have to emit anymore, just need to return this inside the state
      // copy old state,then overwrite everything we need to overwrite
      return { ...state, user: user };

      return;
    case AuthActions.LOGOUT:
      return { ...state, user: null };

    // very important
    default:
      return state;
  }
}
