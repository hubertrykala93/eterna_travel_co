import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  const authenticationService = inject(AuthenticationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authenticationService.token().pipe(
          switchMap(() => {
            return next(req.clone({ withCredentials: true }));
          }),
          catchError(() => {
            return throwError(() => error);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
