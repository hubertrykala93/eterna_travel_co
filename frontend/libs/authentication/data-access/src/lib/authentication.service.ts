import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '@shared/data-access';
import { Observable } from 'rxjs';
import { UserDto, UserRequest } from './authentication.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT);

  public createUser(data: UserRequest): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.environment.backendUrl}/users/me`, data);
  }
}
