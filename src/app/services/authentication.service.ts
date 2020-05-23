import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User2 } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User2>;
  public currentUser: Observable<User2>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User2>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User2 {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
          .pipe(map(responseUser => {
              // login successful if there's a jwt token in the response
              if (responseUser && responseUser.access_token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(responseUser));
                  this.currentUserSubject.next(responseUser);
              }

              return responseUser;
          }));
  }

  logout() {
    return this.http.get<any>(`${environment.apiUrl}/auth/logout`)
          .pipe(map(responseUser => {
              // remove user from local storage to log user out
              localStorage.removeItem('currentUser');
              this.currentUserSubject.next(null);
              return responseUser;
          }));
  }
}
