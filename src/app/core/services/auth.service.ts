// src/core/services/auth.service.ts
import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CustomCookieService } from './cookie.service';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import {
  User,
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = signal(false);
   user = signal<any>(null);

  constructor(
    private http: HttpClient,
    private cookieService: CustomCookieService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = this.cookieService.getUser();
      const token = this.cookieService.getAccessToken();

      if (user && token) {
        this.isAuthenticated.set(true);
        this.user.set(user);
      }
    }
  }

  // Inscription
  register(registerData: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('auth/register/', registerData)
      .pipe(
        tap((response) => {
          this.setAuthData(response);
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  // Connexion
  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('jwt/login/', loginData)
      .pipe(
        tap((response) => {
          this.setAuthData(response);
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  // Rafraîchir le token
  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.cookieService.getRefreshToken();

    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    const refreshData: RefreshTokenRequest = { refresh: refreshToken };

    return this.http
      .post<RefreshTokenResponse>('jwt/refresh/', refreshData)
      .pipe(
        tap((response) => {
          this.cookieService.setAccessToken(response.access_token);
          this.isAuthenticated.set(true);
        }),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  // Déconnexion
  logout() {
    this.clearAuthData();
    
  }

  // Méthode de déconnexion forcée (sans appel API)
  forceLogout(): void {
    this.clearAuthData();
  }

  private setAuthData(response: AuthResponse): void {
    this.cookieService.setAccessToken(response.access_token);
    this.cookieService.setRefreshToken(response.refresh_token);
    this.cookieService.setUser(response.user);
    this.isAuthenticated.set(true);
    this.user.set(response.user);
  }

  private clearAuthData(): void {
    this.cookieService.clear();
    this.isAuthenticated.set(false);
    this.user.set(null);
    this.router.navigate(['/auth/login']);
  }

  // Getters
  getAccessToken(): string {
    return this.cookieService.getAccessToken();
  }

  getRefreshToken(): string {
    return this.cookieService.getRefreshToken();
  }

  getUser(): User | null {
    return this.user();
  }

  getCurrentUser(): Observable<User> {
    return new Observable(observer => {
      const user = this.getUser();
      if (user) {
        observer.next(user);
        observer.complete();
      } else {
        observer.error('No user logged in');
      }
    });
  }
}