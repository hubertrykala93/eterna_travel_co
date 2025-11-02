import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlingService } from '@shared/util/services';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  if (req.url.includes('/assets/i18n')) {
    return next(req);
  }

  const errorHandlingService = inject(ErrorHandlingService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const { title, message, status, redirectUrl } = error.error;

      if (redirectUrl) {
        router.navigateByUrl(redirectUrl);
      }

      errorHandlingService.handleHttpError({
        title: title,
        message: message,
        status: status,
      });

      return throwError(() => error);
    }),
  );
};
