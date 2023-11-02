import { Routes } from "@angular/router";
import { LinksComponent } from "./links.component";
import { AutoLoginPartialRoutesGuard } from "angular-auth-oidc-client";
import { CreateComponent } from "./components/create.component";
import { ListComponent } from "./components/list.component";
import { provideState } from "@ngrx/store";
import { LinksFeature } from "./state";

export const LINKS_ROUTES: Routes = [
  {
    path: "links", // /links
    component: LinksComponent,
    providers: [provideState(LinksFeature)],
    canActivate: [AutoLoginPartialRoutesGuard],
    children: [
      {
        path: "create", // /links/create
        component: CreateComponent,
      },
      {
        path: "list", // //links/list
        component: ListComponent,
      },
    ],
  },
];
