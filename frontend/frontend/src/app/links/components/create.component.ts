import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { urlValidator } from "./url.validator";
import { Store } from "@ngrx/store";
import { LinksCommands, LinksCreate } from "../state/links.actions";

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
        <div
          class="alert alert-error"
          *ngIf="href.errors && (href.touched || href.dirty)"
        >
          <p *ngIf="href.hasError('required')">
            You have to give us a URL for your link!
          </p>
          <p *ngIf="href.hasError('invalidUrl')">
            That doesn't look like a valid URL. (give better help here)
          </p>
        </div>
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
      <div
        class="alert alert-error"
        *ngIf="description.errors && (description.touched || description.dirty)"
      >
        <p *ngIf="description.hasError('required')">
          You have to give us a description for your link!
        </p>
        <p *ngIf="description.hasError('minlength')">
          This has to be at least five characters long.
        </p>
        <p *ngIf="description.hasError('maxlength')">
          This has to be less than 255 characters long.
        </p>
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

  get href() {
    return this.form.controls.href;
  }
  get description() {
    return this.form.controls.description;
  }

  store = inject(Store);

  addLink() {
    if (this.form.valid) {
      const payload = this.form.value as LinksCreate;
      this.store.dispatch(LinksCommands.addLink(payload));
      this.form.reset();
    }
  }
}
