import { Action } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";

// This is a best practice to clearly define our actions through variables (cleaner, less errors like typos...)
export const ADD_INGREDIENT = "ADD_INGREDIENT";

export class AddIngredient implements Action {
  // must never be changed from outside
  readonly type = ADD_INGREDIENT;
  // 'payload' is not a mandatory name, but convention
  payload: Ingredient;
}
