import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LinksDocuments, LinksCommands, LinksEvents } from "./links.actions";
import { map, mergeMap, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { LinksEntity } from ".";

@Injectable()
export class LinksEffects {
  baseUrl = environment.apiUrl + "user";

  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinksEvents.linksEntered),
      mergeMap(() =>
        this.client
          .post(this.baseUrl + "/logins", {}) // WAY LONGER than 16.667 ms
          .pipe(map(() => LinksEvents.userLoggedIn()))
      )
    )
  );

  getSavedLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LinksEvents.userLoggedIn),
      switchMap(() =>
        this.client.get<{ links: LinksEntity[] }>(this.baseUrl + "/links").pipe(
          // { links: [...]}
          map((response) => response.links), // links
          map((payload) => LinksDocuments.links({ payload }))
        )
      )
    )
  );

  addLink$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LinksCommands.addLink),
        mergeMap(({ payload }) =>
          this.client.post(this.baseUrl + "/links", payload)
        )
      ),
    { dispatch: false }
  );
  constructor(
    private readonly actions$: Actions, // "stream of actions that have been dispatched in the application"
    private readonly client: HttpClient
  ) {}
}
