import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';

export const initializeAuth = (userService: UserService): void => {
  firstValueFrom(userService.getCurrentUser());
};
