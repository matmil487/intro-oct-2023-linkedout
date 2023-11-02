import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      counter works!
    </p>
  `,
  styles: [
  ]
})
export class CounterComponent {

}
