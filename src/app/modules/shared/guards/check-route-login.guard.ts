import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserResponse } from '@auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckRouteLoginGuard implements CanActivate {

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
          // si el usuario esta logueado no mostrar login
          if (!user) {
            return true;
          } else {
            this.router.navigate(['dashboard/home'])
            return false;
          }

        })
      )
  }

}
