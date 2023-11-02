import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-links",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div>
      <p class="text-2xl">Links!</p>
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
})
export class LinksComponent {}
