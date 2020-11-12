import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('auth')) {
      return next.handle(req);
    }
    const authToken = this.authService.userTokenValue;
    const authReq = req.clone({
      setHeaders: {
        Authorization: `JWT ${authToken}`
      }
    })
    return next.handle(authReq);
  }
}
