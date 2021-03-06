import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Router } from '@angular/router';

// import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const auth = this.injector.get(AuthService);
    console.log('log', request)
    const authRequest = request.clone({
      setHeaders: {
        // Authorization: `Bearer ${auth.getToken()}`
      },
      url: `${environment.api}/${request.url}`
    });

    return next.handle(authRequest)
      .catch(err => {
        if (err instanceof HttpErrorResponse && err.status === 0) {
          console.log('Check Your Internet Connection And Try again Later');
        } else if (err instanceof HttpErrorResponse && err.status === 401) {
          // auth.setToken(null);
          // this.router.navigate(['/', 'login']);
        }
        return Observable.throw(err);
      });
  }
}
