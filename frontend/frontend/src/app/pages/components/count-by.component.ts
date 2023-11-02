import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { CountByValues, CounterFeature } from "src/app/state/counter";
import { CounterCommands } from "src/app/state/counter.actions";

@Component({
  selector: "app-count-by",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="join">
      <button
        [disabled]="countingBy() === 1"
        (click)="setCountBy(1)"
        class="btn join-item"
      >
        Count By 1
      </button>
      <button
        [disabled]="countingBy() === 3"
        (click)="setCountBy(3)"
        class="btn join-item"
      >
        Count By 3
      </button>
      <button
        [disabled]="countingBy() === 5"
        (click)="setCountBy(5)"
        class="btn join-item"
      >
        Count By 5
      </button>
    </div>
  `,
  styles: [],
})
export class CountByComponent {
  store = inject(Store);
  countingBy = this.store.selectSignal(CounterFeature.selectBy);
  setCountBy(by: CountByValues) {
    this.store.dispatch(CounterCommands.setCountBy({ by }));
  }
}
