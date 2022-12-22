import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.action";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    // this.userSub = this.authService.user.subscribe((user) => {
    //   this.isAuthenticated = !!user;
    // });

    this.userSub = this.store
      .select("auth")
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });

    console.log("Authenticated ?: ", this.isAuthenticated);
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
