import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OidcSecurityService } from "angular-auth-oidc-client";

@Component({
  selector: "app-callback",
  standalone: true,
  imports: [CommonModule],
  template: ``,
  styles: [],
})
export class CallbackComponent implements OnInit {
  service = inject(OidcSecurityService);

  ngOnInit(): void {
    this.service.checkAuth().subscribe(({ isAuthenticated }) => {
      console.log("App is Authenticated", isAuthenticated);
    });
  }
}
