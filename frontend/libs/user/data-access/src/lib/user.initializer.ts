import { HttpErrorResponse } from '@angular/common/http';
import { catchError, firstValueFrom, of, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

export const initializeAuth = (
  userService: UserService,
  authenticationService: AuthenticationService,
): void => {
  firstValueFrom(
    userService.getCurrentUser().pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return authenticationService.token().pipe(switchMap(() => userService.getCurrentUser()));
        }

        return throwError(() => of(null));
      }),
    ),
  );
};
