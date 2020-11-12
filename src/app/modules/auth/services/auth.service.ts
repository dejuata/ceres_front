import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { UserResponse, User } from '@auth/interfaces/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<string>(null);
  private userToken = new BehaviorSubject<string>(null);

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isRole(): Observable<string> {
    return this.role.asObservable();
  }

  get userTokenValue(): string {
    return this.userToken.getValue();
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.checkToken();
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.baseUrl}/auth/login`, authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user);
          this.loggedIn.next(true);
          this.role.next(user.authenticatedUser.role)
          this.userToken.next(user.access)
          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.role.next(null);
    this.userToken.next(null)
    this.router.navigate(['auth/signin'])
  }

  private checkToken() {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        this.loggedIn.next(true);
        this.role.next(user.role)
        this.userToken.next(user.token)
      }
    }
  }

  private saveLocalStorage(user: UserResponse) {
    let data = {
      "token": user.access,
      "role": user.authenticatedUser.role
    }
    localStorage.setItem('user', JSON.stringify(data));
  }

  private handlerError(err): Observable<never> {
    let errorMessage = 'An error ocurred retrienving data';
    if(err) {
      errorMessage = `Error: code ${err.message}`;
    }
    // window.alert(errorMessage)
    return throwError(errorMessage);
  }
}
