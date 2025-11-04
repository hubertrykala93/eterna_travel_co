import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export const initializeAuth = (authenticationService: AuthenticationService): void => {
  firstValueFrom(authenticationService.getCurrentUser());
};
