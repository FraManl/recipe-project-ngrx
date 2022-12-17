import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from "@angular/common/http";
import { take, exhaustMap, map } from "rxjs/operators";

import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // here we are accessing our user
    // with ngrx, no need to use authservice anymore

    // retrieve the user from the auth store
    return this.store.select("auth").pipe(
      take(1), // take only one snapshot
      // at this point we have an object with the user inside, so need extract the user out
      // mapped as an observable aswell
      map((authState) => {
        return authState.user;
      }),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set("auth", user.token),
        });
        return next.handle(modifiedReq);
      })
    );

    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     if (!user) {
    //       return next.handle(req);
    //     }
    //     const modifiedReq = req.clone({
    //       params: new HttpParams().set("auth", user.token),
    //     });
    //     return next.handle(modifiedReq);
    //   })
    // );
  }
}
