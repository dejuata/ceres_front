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

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
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
        map((res: UserResponse) => {
          this.saveToken(res.access);
          this.loggedIn.next(true);
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false)
    this.router.navigate(['auth/signin'])
  }

  private checkToken() {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log("isExpired", isExpired);
    isExpired ? this.logout() : this.loggedIn.next(true);
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  private handlerError(err): Observable<never> {
    let errorMessage = 'An error ocurred retrienving data';
    if(err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage)
    return throwError(errorMessage);
  }
}
