import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    template: `
     <header>
        <p class="text-3xl font-mono">Linked Out</p>
        <p class="text-lg">Our Application</p>
      </header>
    `,
    standalone: true
})
export class HeaderComponent {

}