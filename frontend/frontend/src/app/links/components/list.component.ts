import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { LinksFeature } from "../state";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card w-56 bg-base-100 shadow-xl" *ngFor="let link of links()">
      <div class="card-body">
        <h2 class="card-title text-ellipsis line-clamp-1">
          {{ link.description }}
        </h2>
        <p>{{ link.href }}</p>
      </div>
    </div>
  `,
  styles: [],
})
export class ListComponent {
  store = inject(Store);
  links = this.store.selectSignal(LinksFeature.getAllLinks);
}
