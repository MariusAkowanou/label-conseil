import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CustomCookieService {
  constructor(private cookieService: CookieService) {}

  setAccessToken(token: string) {
    this.cookieService.set('access_token', token, {
      expires: 1,
      path: '/',
      secure: true,
      sameSite: 'Strict',
    });
  }

  getAccessToken(): string {
    return this.cookieService.get('access_token') || '';
  }

  setRefreshToken(token: string) {
    this.cookieService.set('refresh_token', token, {
      expires: 7,
      path: '/',
      secure: true,
      sameSite: 'Strict',
    });
  }

  getRefreshToken(): string {
    return this.cookieService.get('refresh_token') || '';
  }

  setUser(user: any) {
    if (user) {
      this.cookieService.set('user', JSON.stringify(user), {
        expires: 1,
        path: '/',
        secure: true,
        sameSite: 'Strict',
      });
    }
  }

  getUser(): any {
    try {
      const userCookie = this.cookieService.get('user');
      if (!userCookie) {
        return null;
      }
      return JSON.parse(userCookie);
    } catch (error) {
      this.cookieService.delete('user', '/');
      return null;
    }
  }

  clear() {
    this.cookieService.delete('access_token', '/');
    this.cookieService.delete('refresh_token', '/');
    this.cookieService.delete('user', '/');
  }
}
