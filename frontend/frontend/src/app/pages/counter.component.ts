import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { CounterCommands, CounterEvents } from "../state/counter.actions";
import { CounterFeature } from "../state/counter";
import { CountByComponent } from "./components/count-by.component";

@Component({
  selector: "app-counter",
  standalone: true,
  template: `
    <div>
      <button type="button" class="btn btn-primary" (click)="decrement()">
        -
      </button>
      <span>{{ current() }}</span>
      <button type="button" class="btn btn-primary" (click)="increment()">
        +
      </button>
    </div>
    <div>
      <button
        [disabled]="current() === 0"
        (click)="reset()"
        type="button"
        class="btn btn-warning"
      >
        Reset
      </button>
      <div>
        <app-count-by />
      </div>
    </div>
  `,
  styles: [],
  imports: [CommonModule, CountByComponent],
})
export class CounterComponent {
  current = this.store.selectSignal(CounterFeature.selectCurrent);

  constructor(private readonly store: Store) {
    store.dispatch(CounterEvents.counterFeatureEntered());
  }

  increment() {
    this.store.dispatch(CounterCommands.incrementTheCount());
  }

  decrement() {
    this.store.dispatch(CounterCommands.decrementTheCount());
  }

  reset() {
    this.store.dispatch(CounterCommands.resetTheCount());
  }
}
