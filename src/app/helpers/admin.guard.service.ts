import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate  {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.authenticationService.isAdminUser().subscribe(
        response => {
          if (!response) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          }
          return response;
        },
        error => {
          console.error(error);
          return false;
        }
      );
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
          // authorised so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/student'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
