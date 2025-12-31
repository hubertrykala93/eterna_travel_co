import { catchError, of, tap } from 'rxjs';
import { UserService } from './user.service';
import { UserStoreInstance } from './user.store';

export const userInitializer = (userService: UserService, userStore: UserStoreInstance) => {
  return userService.getCurrentUser().pipe(
    tap((user) => {
      console.log('User -> ', user);
      userStore.setUser(user);
    }),
    catchError((error) => {
      console.log('Error -> ', error);
      userStore.setUser(null);
      return of(null);
    }),
  );
};
