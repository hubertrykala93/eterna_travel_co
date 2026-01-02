import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ENVIRONMENT } from '@shared/data-access';
import { Observable } from 'rxjs';
import { UserDto, UserRequest } from './user.model';
import { UserStore } from './user.store';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT);
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);

  public login(data: UserRequest): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.environment.backendUrl}/users/me/login`, data, {
      withCredentials: true,
    });
  }

  public token(): Observable<void> {
    return this.http.post<void>(
      `${this.environment.backendUrl}/users/me/token`,
      {},
      { withCredentials: true },
    );
  }

  public logout(): Observable<void> {
    return this.http.post<void>(
      `${this.environment.backendUrl}/users/me/logout`,
      {},
      { withCredentials: true },
    );
  }
}
