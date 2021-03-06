import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User2 } from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User2;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout($event) {
    this.authService.logout().pipe(first())
    .subscribe(
        data => {
             this.router.navigate(['/login']);
        });
  }

}
