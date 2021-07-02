import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * class {HttpRequestInterceptor}
 */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true, request.url);
    const token = this.authService.getToken();

    const req = token ? this.addAuthorizationHeaderAndClone(request, token) : request.clone();

    return next.handle(req)
      .pipe(catchError((err) => {
        this.loadingService.setLoading(false, req.url);
        if (err.status === 403) {
          this.router.navigate(['/login']);
        }
        return err;
      }))
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.loadingService.setLoading(false, req.url);
        }
        return evt;
      }));
  }

  private addAuthorizationHeaderAndClone(request: HttpRequest<any>, token: string): any {
    return request.clone({ headers: request.headers.append('Authorization', token) });
  }
}
