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
    case AuthActions.LOGOUT:

    // very important
    default:
      return state;
  }
}
