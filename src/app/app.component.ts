import { Component } from "@angular/core";
import { AuthenticationService } from "./services/authentication.service";
import { User2 } from "./models/user";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "skool";
  currentUser: User2;
  actualURL: any;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    activatedRoute: ActivatedRoute
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.actualURL = event.urlAfterRedirects;
      }
    });
  }
}
