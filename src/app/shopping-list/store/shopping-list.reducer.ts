import { StaticReflector } from "@angular/compiler";
import { Action } from "@ngrx/store";
import { appendFile } from "fs";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

// pattern to manage multiple state formats

// describing application state for shopping list
// define how the state should look like for the shopping list
// For this part of the app, only this state should be defined here
export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

// this does not really belong here now that we have multiple reducers (shopping list & auth)
// See global store instead
// export interface AppState {
//   shoppingList: State;
// }

// Set initial state
const initialState = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

// prepare the transformation function, that will receive state modifications and associated actions to conducti
export function shoppingListReducer(
  state: State = initialState,
  // action: ShoppingListActions.AddIngredient
  // Fallback solution for multiple actions, but problem with the payload, won't know it...
  // action: Action
  // Or...
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      // return a new state, must be immutable !
      // never touch the existing state
      // WRONG
      // state.ingredients.push();

      // Do this instead (shallow copy using spread)
      return {
        // Always by convention/best practice, copy the old state first
        ...state,
        // output all already existing ingredients, + add the ingredients added by action payload
        ingredients: [...state.ingredients, action.payload],
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        // Always by convention/best practice, copy the old state first
        ...state,
        // output all already existing ingredients, + add the ingredients added by action payload
        // this will give an array of array /!\
        // ingredients: [...state.ingredients, action.payload],
        // Do this instead : merge both arrayts into one, using spread
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      // enforce immutable logic... prevent from editing old state*
      // always edit immutably, copy first, then edit
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];
      // Array of ingredients where we overwrote 1 ingredient
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredints: updatedIngredients,
        editIngredient: null,
        editIngredientIndex: -1,
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    // return any case we're not explicitely handling
    default:
      return state;
  }
}
