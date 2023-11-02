import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { CounterFeature } from "../state/counter";
import { CommonModule } from "@angular/common";
import { OidcSecurityService } from "angular-auth-oidc-client";

@Component({
  selector: "app-header",
  template: `
    <header>
      <p class="text-3xl font-mono">Linked Out</p>
      <span *ngIf="current() % 2 === 0">Even</span>
      <span *ngIf="current() % 2 !== 0">Odd</span>
      <p class="text-lg">Our Application</p>
      <button (click)="logOff()" type="button" class="btn btn-sm btn-warning">
        Log Out
      </button>
    </header>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent {
  current = this.store.selectSignal(CounterFeature.selectCurrent);
  security = inject(OidcSecurityService);
  constructor(private store: Store) {}

  logOff() {
    this.security.logoff().subscribe();
  }
}
