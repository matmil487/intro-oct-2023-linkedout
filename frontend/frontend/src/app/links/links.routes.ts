import { Routes } from "@angular/router";
import { LinksComponent } from "./links.component";
import { AutoLoginPartialRoutesGuard } from "angular-auth-oidc-client";
import { CreateComponent } from "./components/create.component";
import { ListComponent } from "./components/list.component";

export const LINKS_ROUTES: Routes = [
  {
    path: "links", // /links
    component: LinksComponent,
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
