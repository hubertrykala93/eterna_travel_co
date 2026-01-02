import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { UserDto } from './user.model';
import { UserService } from './user.service';
import { UserStoreInstance } from './user.store';

export const userInitializer = (
  userService: UserService,
  authenticationService: AuthenticationService,
  userStore: UserStoreInstance,
): Observable<UserDto | null> =>
  userService.getCurrentUser().pipe(
    tap((user) => {
      userStore.setUser(user);
    }),
    catchError((error: HttpErrorResponse) => {
      if (userStore.isLoggedOut()) {
        return of(null);
      }

      if (error.status === 401) {
        return authenticationService.token().pipe(
          switchMap(() => userService.getCurrentUser()),
          tap((user) => userStore.setUser(user)),
          catchError(() => {
            userStore.logout();

            return of(null);
          }),
        );
      }

      return of(null);
    }),
  );
