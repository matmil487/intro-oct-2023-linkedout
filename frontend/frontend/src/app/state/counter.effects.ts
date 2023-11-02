import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { debounceTime, map, mergeMap, switchMap, tap } from "rxjs";
import {
  CounterCommands,
  CounterDocuments,
  CounterEvents,
} from "./counter.actions";
import { CounterFeature, CounterState } from "./counter";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable()
export class CounterEffects {
  private readonly baseUrl = environment.apiUrl;

  // effect that says "when the counter feature is entered"
  // "log the user in" - run a command.

  loadCounterData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterEvents.userLoggedIn),
      switchMap(() =>
        this.client
          .get<CounterState>(this.baseUrl + "user/counter")
          .pipe(
            map((response) =>
              CounterDocuments.counterState({ payload: response })
            )
          )
      )
    )
  );

  logIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CounterEvents.counterFeatureEntered),
        mergeMap(() =>
          this.client
            .post(this.baseUrl + "user/logins", {})
            .pipe(map(() => CounterEvents.userLoggedIn()))
        )
      ),
    { dispatch: true }
  );

  logIt$ = createEffect(
    () =>
      this.actions$.pipe(
        tap((a) => console.log(`Got an action of type ${a.type}`))
      ),
    { dispatch: false }
  );

  logCounter$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CounterCommands.incrementTheCount,
          CounterCommands.decrementTheCount,
          CounterCommands.resetTheCount,
          CounterCommands.setCountBy
        ), // if itisn't one of these, forget it about it. "filter"
        debounceTime(1000),
        concatLatestFrom(() =>
          this.store.select(CounterFeature.selectCounterFeatureState)
        ),
        map(([_, data]) => data), // => data
        switchMap((data) =>
          this.client
            .post(`${this.baseUrl}user/counter`, data)
            .pipe(tap(() => console.log("Sent it to the server")))
        )
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly client: HttpClient
  ) {}
}
