import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, mapTo, tap, map } from 'rxjs/operators';

import { User2 } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User2>;
  public currentUser: Observable<User2>;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'currentUser';
  private loggedUser: string;

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
                  localStorage.setItem(this.JWT_TOKEN, responseUser.access_token);
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
              localStorage.removeItem(this.JWT_TOKEN);
              this.currentUserSubject.next(null);
              return responseUser;
          }));
  }

  login2(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(tokens => this.doLoginUser(email, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout2() {
    return this.http.post<any>(`${environment.apiUrl}/auth/logout`, {
      refreshToken: this.getJwtToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/auth/refresh`, {
      refreshToken: this.getJwtToken()
    }).pipe(tap((tokens: any) => {
      this.storeJwtToken(tokens.token);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: User2) {

    if (tokens && tokens.access_token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(tokens));
      this.currentUserSubject.next(tokens);
    }
    this.loggedUser = username;
    this.storeTokens(tokens);
    return tokens;
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.currentUserSubject.next(null);
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: User2) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access_token);
   // localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem('currentUser');
  }

  isAdminUser() {
    return this.http.get<any>(`${environment.apiUrl}/v1/user/is/admin`, );
  }
}
