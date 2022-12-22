import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map } from "rxjs/operators";
import { switchMap } from "rxjs/operators";
import * as AuthActions from "./auth.action";
import { environment } from "../../../environments/environment";

import { of } from "rxjs";
import { Injectable } from "@angular/core";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

// just make it injectable for inner modules
@Injectable()
export class AuthEffects {
  // Effects are actions themselves, observables, and they return actions, it just executes some code
  // the idea here is to execute code when actions are dispatched, like an interceptor, but the idea is not to change the state; it is to build effects aside of actions, using a stream

  // Action effect handler
  @Effect()
  authLogin = this.actions$.pipe(
    // which type of effects to continue with ?
    // only LOGIN StART for instance.. can also specify multiple actions
    ofType(AuthActions.LOGIN_START),
    // do what with it ? yield something
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return of(
              new AuthActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate,
              })
            );
          }),
          catchError((error) => {
            // ...

            // crucial to return a non error here
            // return a new action, it cannot be the catchError first, because an effect must never die otherwise it will break the inherent login action (catchError would kill the effect if it occurs...)
            return of();
          })
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
