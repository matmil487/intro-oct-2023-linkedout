import { AbstractControl } from "@angular/forms";

// a validator function
export function urlValidator(
  control: AbstractControl
): { [key: string]: unknown } | null {
  // if there is a value
  if (control.value) {
    // if it does not match the pattern for a valid URL
    if (!control.value.match(/^https?:\/{2}\w+(\.\w+)*(:[0-9]+)?\/?/)) {
      // return an error
      return { invalidUrl: true };
    }
  }
  // if there is no error
  return null;
}
