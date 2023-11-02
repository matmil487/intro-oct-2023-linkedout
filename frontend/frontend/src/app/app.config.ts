import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { reducers } from "./state";
import { provideState, provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { CounterFeature } from "./state/counter";
import { CounterEffects } from "./state/counter.effects";
import { provideEffects } from "@ngrx/effects";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor, provideAuth } from "angular-auth-oidc-client";
import { authConfig } from "./auth.config";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAuth(authConfig),
    provideStore(reducers), // we can inject Store, and sets up an empty application state
    provideState(CounterFeature), //
    provideEffects([CounterEffects]),
    provideHttpClient(withInterceptors([authInterceptor()])),
    provideStoreDevtools(),
  ],
};
