import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIResponse, ENVIRONMENT } from '@shared/data-access';
import { Observable } from 'rxjs';
import { ActivationRequest, UserDto, UserRequest } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT);

  public activate(data: ActivationRequest): Observable<APIResponse> {
    return this.http.put<APIResponse>(`${this.environment.backendUrl}/users/me/activate`, data);
  }

  public register(data: UserRequest): Observable<void> {
    return this.http.put<void>(`${this.environment.backendUrl}/users/me`, data);
  }

  public getCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.environment.backendUrl}/users/me`, {
      withCredentials: true,
      headers: {
        'X-Skip-Error-Toast': 'true',
      },
    });
  }
}
