import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '@shared/data-access';
import { Observable } from 'rxjs';
import { UserDto } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT);

  public getCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.environment.backendUrl}/users/me`, {
      withCredentials: true,
      headers: {
        'X-Skip-Error-Toast': 'true',
      },
    });
  }
}
