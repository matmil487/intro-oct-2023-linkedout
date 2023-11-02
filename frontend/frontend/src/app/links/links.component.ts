import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { LinksEvents } from "./state/links.actions";
import { OverviewComponent } from "./components/overview.component";

@Component({
  selector: "app-links",
  standalone: true,
  template: `
    <div>
      <p class="text-2xl">Links!</p>
      <app-overview />
    </div>
    <section class="grid">
      <ul class="row-start-1 col-span-1">
        <li>
          <a routerLink="create" class="btn btn-primary">Create a Link</a>
        </li>
        <li>
          <a routerLink="list" class="btn btn-primary">Show Links</a>
        </li>
      </ul>
      <div class="row-start-1 col-span-11 p-2">
        <router-outlet />
      </div>
    </section>
  `,
  styles: [],
  imports: [CommonModule, RouterModule, OverviewComponent],
})
export class LinksComponent {
  constructor(store: Store) {
    store.dispatch(LinksEvents.linksEntered());
  }
}
