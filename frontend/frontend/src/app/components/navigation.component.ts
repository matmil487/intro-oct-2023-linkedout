import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  standalone: true,
  template: `
    <nav>
      <div class="tabs">
        <a
          routerLink="/home"
          [routerLinkActive]="['tab-active']"
          class="tab tab-lg tab-lifted"
          >Home</a
        >
        <a
          routerLink="/counter"
          [routerLinkActive]="['tab-active']"
          class="tab tab-lg tab-lifted"
          >Counter</a
        >
        <a
          routerLink="/todos"
          [routerLinkActive]="['tab-active']"
          class="tab tab-lg tab-lifted"
          >Todo List</a
        >
        <a
          routerLink="/links"
          [routerLinkActive]="['tab-active']"
          class="tab tab-lg tab-lifted"
          >Links</a
        >
      </div>
    </nav>
  `,
  selector: "app-navigation",
  imports: [RouterLink, RouterLinkActive],
})
export class NavigationComponent {}
