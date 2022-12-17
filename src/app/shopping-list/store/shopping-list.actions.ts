import { Action } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";

// This is a best practice to clearly define our actions through variables (cleaner, less errors like typos...)
// be careful as those identifiers are reachable by all reducers in the entire app...
// have to be unique
// one easy way to make them unique : prefixing
export const ADD_INGREDIENT = "[Shopping List] Add Ingredient";
export const ADD_INGREDIENTS = "[Shopping List] Add Ingredients";
export const UPDATE_INGREDIENT = "[Shopping List] Update Ingredient";
export const DELETE_INGREDIENT = "[Shopping List] Delete Ingredient";
export const START_EDIT = "[Shopping List] Start Edit";
export const STOP_EDIT = "[Shopping List] Stop Edit";

export class AddIngredient implements Action {
  // must never be changed from outside
  readonly type = ADD_INGREDIENT;
  // 'payload' is not a mandatory name, but convention
  // payload: Ingredient;

  constructor(public payload: Ingredient) {}
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}
// Remedy for reducer multiple actions access : export multiple types (union of action types)
// this is a TS feature
export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
