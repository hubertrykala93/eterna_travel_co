import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorHandlingService } from '@shared/util/services';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  if (req.url.includes('/assets/i18n')) {
    return next(req);
  }

  const errorHandlingService = inject(ErrorHandlingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const { title, message, status } = error.error;

      errorHandlingService.handleHttpError({
        title: title,
        message: message,
        status: status,
      });

      return throwError(() => error);
    }),
  );
};
