import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APIResponse, ENVIRONMENT } from '@shared/data-access';
import { Observable } from 'rxjs';
import { ActivationRequest, UserDto, UserRequest } from './authentication.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT);

  public register(data: UserRequest): Observable<void> {
    return this.http.put<void>(`${this.environment.backendUrl}/users/me`, data);
  }

  public activate(data: ActivationRequest): Observable<APIResponse> {
    return this.http.put<APIResponse>(`${this.environment.backendUrl}/users/me/activate`, data);
  }

  public login(data: UserRequest): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.environment.backendUrl}/users/me/login`, data);
  }

  public token(data: UserRequest): Observable<any> {
    return this.http.post<any>(`${this.environment.backendUrl}/users/me/token`, data, {
      withCredentials: true,
    });
  }
}
