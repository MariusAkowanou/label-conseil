import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService, environment } from '../public-api';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const baseUrl = environment.apiUrl;

  // Exclure les requêtes vers les assets et les URLs externes
  if (req.url.startsWith('/assets/') || req.url.startsWith('http')) {
    return next(req);
  }

  // Ajouter la base URL pour les requêtes API
  let apiReq = req.clone({
    url: `${baseUrl}/${req.url.replace(/^\//, '')}`,
    withCredentials: true,
  });

  // Ajouter le Bearer token si connecté
  const accessToken = authService.getAccessToken();
  if (accessToken) {
    apiReq = apiReq.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(apiReq).pipe(
    catchError((error) => {
      // Éviter les appels récursifs pour les endpoints d'authentification
      if (error.status === 401 && !req.url.includes('jwt/refresh') && !req.url.includes('jwt/login') && !req.url.includes('auth/register')) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            const newAccessToken = authService.getAccessToken();
            if (newAccessToken) {
              apiReq = apiReq.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              return next(apiReq);
            } else {
              // Si pas de nouveau token, déconnexion immédiate
              authService.forceLogout();
              return throwError(() => new Error('Token refresh failed'));
            }
          }),
          catchError((refreshError) => {
            // En cas d'échec du rafraîchissement (erreur 500 ou autre), déconnexion immédiate
            console.error('Token refresh failed:', refreshError);
            authService.forceLogout();
            return throwError(() => new Error('Authentication failed - please login again'));
          })
        );
      }
      return throwError(() => error);
    })
  );
};
