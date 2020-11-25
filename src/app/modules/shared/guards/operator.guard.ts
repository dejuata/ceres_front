import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/services/auth.service';
import { map, take } from 'rxjs/operators';
import { UserResponse } from '@auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class OperatorGuard implements CanActivate {
  constructor (
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(): Observable<boolean> {
      return this.authService.user$
        .pipe(
          take(1),
          map((user: UserResponse) => {
            if (user.role == "1" || user.role == "4") {
              return true;
            } else {
              this.router.navigate(['auth/signin'])
              return false;
            }
          })
        )
  }
}

