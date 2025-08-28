import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Ne montrer les notifications automatiques que pour certaines erreurs critiques
      // Les erreurs de validation et d'authentification sont gérées par les composants
      if (shouldShowGlobalNotification(error)) {
        let errorMessage = getGlobalErrorMessage(error);
      }

      return throwError(() => error);
    })
  );
};

function shouldShowGlobalNotification(error: HttpErrorResponse): boolean {
  // Ne pas afficher de notification globale pour ces cas
  const excludedPaths = ['/auth/', '/login', '/register'];
  const isAuthPath = excludedPaths.some(path => error.url?.includes(path));
  
  // Afficher seulement pour les erreurs serveur critiques
  return !isAuthPath && (error.status >= 500 || !error.status);
}

function getGlobalErrorMessage(error: HttpErrorResponse): string {
  if (!error.status) {
    return 'Erreur réseau : impossible de se connecter au serveur.';
  }
  
  switch (error.status) {
    case 500:
      return 'Erreur interne du serveur. Veuillez réessayer plus tard.';
    case 503:
      return 'Service temporairement indisponible.';
    default:
      return 'Une erreur inattendue s\'est produite.';
  }
}