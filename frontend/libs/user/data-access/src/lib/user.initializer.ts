import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { UserStoreInstance } from './user.store';

export const userInitializer = (
  userService: UserService,
  authenticationService: AuthenticationService,
  userStore: UserStoreInstance,
) => {
  return userService.getCurrentUser().pipe(
    tap((user) => {
      userStore.setUser(user);
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authenticationService
          .token()
          .pipe(
            switchMap(() =>
              userService.getCurrentUser().pipe(tap((user) => userStore.setUser(user))),
            ),
          );
      }

      userStore.setUser(null);

      return of(null);
    }),
  );
};
