import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '@shared/util/services';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  const loaderService = inject(LoaderService);

  const excludedUrls = ['/assets/i18n'];
  const excludedHeaders = ['x-skip-error-toast'];

  const isExcludedUrls = excludedUrls.some((url) => req.url.includes(url));
  const isExcludedHeaders = excludedHeaders.some((header) => req.headers.has(header));

  if (isExcludedUrls || isExcludedHeaders) {
    return next(req);
  }

  loaderService.show();

  return next(req).pipe(
    finalize(() => {
      loaderService.hide();
    }),
  );
};
