import { User } from "../user.model";

// define how the state should look like for auth
export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export function authReducer(state = initialState, action) {
  return state;
}
