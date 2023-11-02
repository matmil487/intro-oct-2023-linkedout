import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { urlValidator } from "./url.validator";

@Component({
  selector: "app-create",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="addLink()">
      <div class="form-control w-full">
        <label for="href" class="label">Hyperlink</label>
        <input
          formControlName="href"
          type="text"
          class="input input-bordered w-full"
          id="href"
        />
      </div>
      <div class="form-control w-full">
        <label for="description" class="label">Description</label>
        <textarea
          formControlName="description"
          name="description"
          id="description"
          cols="8"
          rows="8"
          class="textarea textarea-bordered"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Add This Link</button>
    </form>
  `,
  styles: [],
})
export class CreateComponent {
  form = new FormGroup({
    href: new FormControl<string>("", {
      validators: [Validators.required, urlValidator],
      nonNullable: true,
    }),
    description: new FormControl<string>("", {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ],
      nonNullable: true,
    }),
  });


  
  addLink() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log("You have Errors!");
    }
  }
}
