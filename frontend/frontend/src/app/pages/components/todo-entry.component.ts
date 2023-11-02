import { Component, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-todo-entry",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="addItem()">
      <div class="form-control w-full max-w-xs">
        <label for="description" class="label">
          <span class="label-text">Description?</span>
        </label>
        <input
          id="description"
          formControlName="description"
          type="text"
          class="input input-bordered w-full max-w-xs"
        />
        <label for="description" class="label">
          <span class="label-text-alt"
            >What do you want to add to your list?</span
          >
        </label>
      </div>
      <button type="submit" class="btn btn-primary">
        Add This To Your List
      </button>
    </form>
  `,
  styles: [],
})
export class TodoEntryComponent {
  @Output() itemAdded = new EventEmitter<string>();
  form = new FormGroup({
    description: new FormControl<string>(""),
  });

  addItem() {
    this.itemAdded.emit(this.form.controls.description.value!);
    this.form.reset();
  }
}
