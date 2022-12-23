// merge all application reducers together
import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromAuth from "../auth/store/auth.reducer";
import { ActionReducerMap } from "@ngrx/store";
import * as fromRecipes from "../recipes/store/recipe.reducer";

export interface AppState {
  // importing all states here, and pointing them individually to their respective states
  // this is a reducer map, the same that exist in the forRoot() in app module
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer,
};
