import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

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
    return this.authService.isLogged
      .pipe(
        take(1),
        map((isLogged: boolean) => {
          // si el usuario esta logueado no mostrar login
          if (!isLogged) {
            return true;
          } else {
            this.router.navigate(['dashboard/home'])
            return false;
          }

        })
      )
  }

}
