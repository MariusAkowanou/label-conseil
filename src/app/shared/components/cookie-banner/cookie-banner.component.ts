import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss'
})
export class CookieBannerComponent implements OnInit {
  private cookieService = inject(CookieService);

  showBanner = signal(false);
  showDetails = signal(false);

  ngOnInit() {
    // Vérifier si l'utilisateur a déjà accepté/refusé les cookies
    const cookieConsent = this.cookieService.get('cookie-consent');
    if (!cookieConsent) {
      // Petit délai pour une meilleure UX
      setTimeout(() => {
        this.showBanner.set(true);
      }, 1000);
    }
  }

  acceptAll() {
    this.setCookieConsent('accepted');
    this.closeBanner();
  }

  rejectAll() {
    this.setCookieConsent('rejected');
    this.closeBanner();
  }

  acceptSelected() {
    // Pour l'instant, même logique que acceptAll
    // Vous pouvez étendre cela pour gérer des cookies spécifiques
    this.setCookieConsent('partial');
    this.closeBanner();
  }

  toggleDetails() {
    this.showDetails.update(value => !value);
  }

  private setCookieConsent(status: 'accepted' | 'rejected' | 'partial') {
    // Cookie consent valide 1 an
    this.cookieService.set('cookie-consent', status, {
      expires: 365,
      path: '/',
      secure: true,
      sameSite: 'Strict'
    });

    // Si accepté, on peut définir d'autres cookies nécessaires
    if (status === 'accepted' || status === 'partial') {
      this.cookieService.set('analytics-enabled', 'true', {
        expires: 365,
        path: '/',
        secure: true,
        sameSite: 'Strict'
      });
    }
  }

  private closeBanner() {
    this.showBanner.set(false);
  }
}