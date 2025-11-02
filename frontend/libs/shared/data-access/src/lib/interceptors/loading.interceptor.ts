import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '@shared/util/services';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  const loaderService = inject(LoaderService);

  loaderService.show();

  return next(req).pipe(
    finalize(() => {
      loaderService.hide();
    }),
  );
};
