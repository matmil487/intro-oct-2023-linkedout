import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { LinksFeature } from "../state";

@Component({
  selector: "app-overview",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert alert-info">
      <p>You have {{ numberOfLinks$ | async }} links</p>
    </div>
  `,
  styles: [],
})
export class OverviewComponent {
  store = inject(Store);

  numberOfLinks$ = this.store.select(LinksFeature.selectNumberOfLinks);
}
