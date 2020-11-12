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
  private user = new BehaviorSubject<UserResponse>(null);

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.checkToken();
  }

  get user$ (): Observable<UserResponse> {
    return this.user.asObservable();
  }

  get userValue (): UserResponse {
    return this.user.getValue();
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.baseUrl}/auth/login`, authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user);
          this.user.next(user);
          return user;
        }),
        // catchError((err) => this.handlerError(err))
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['auth/signin'])
  }

  private checkToken() {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        // Esto puede causar un error ya que el user que paso no es el mismo UserResponse
        this.user.next(user);
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
    return throwError(errorMessage);
  }
}
