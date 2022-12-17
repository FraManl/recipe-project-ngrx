import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
// import { ShoppingListService } from "./shopping-list.service";
import { LoggingService } from "../logging.service";

import * as fromShoppingList from "./store/shopping-list.reducer";
import * as ShoppingListActions from "./store/shopping-list.actions";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[];
  // now here we need an observable as ingredients
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(
    // private slService: ShoppingListService,
    private loggingService: LoggingService,
    // Selecting the state coming from the store
    // Expected structure is coming from app.module reducer map {shoppingList: ShoppingListReducer} and from shopping list reducer
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    /// The way without store, to fetch ingredients...
    // this.ingredients = this.shoppingListService.getIngredients();
    // The way of reacting to ingredients changes with subject...
    // this.igChanged = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    // Now with reducer (state management); it will also fulfill what getIngredients() does on load...
    // Select a slice of the state, in case the store contains multiple state objects
    // Tell angular which part of the store i'm intrerested in
    this.ingredients = this.store.select("shoppingList"); // this returns an observable

    // note that the pipe in templater is optional, can subscribe from here (don't forget to destroy)
    // this.ingredients = this.store.select("shoppingList").subscribe();

    // this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit!");
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
