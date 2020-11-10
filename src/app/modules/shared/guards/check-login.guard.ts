import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor (
    private authService: AuthService
  ) {

  }

  canActivate(): Observable<boolean> {
    return this.authService.isLogged
      .pipe(
        take(1),
        map((isLogged: boolean) => !isLogged)
      )
  }

}
