import { Recipe } from "../recipe.model";
import * as RecipesActions from "./recipe.action";

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return { ...state, recipes: [...action.payload] };

    case RecipesActions.FETCH_RECIPES:
      return { ...state };

    case RecipesActions.ADD_RECIPES:
      return { ...state, recipes: [...state.recipes, action.payload] };

    case RecipesActions.UPDATE_RECIPES:
      // overwrite the recipe to be updated
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        // overwrite
        ...action.payload.newRecipe,
      };

      // overwrite the state with the updated recipe
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return { ...state, recipes: updatedRecipes };

    case RecipesActions.DELETE_RECIPES:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        }),
      };

    default:
      return state;
  }
}
