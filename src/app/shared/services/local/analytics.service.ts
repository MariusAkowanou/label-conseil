import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

declare let gtag: Function;

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {
    private cookieService = inject(CookieService);
    private isInitialized = false;
    private readonly GA_ID = 'G-XXXXXXXXXX'; // À remplacer par votre ID

    initializeAnalytics() {
        if (this.canUseAnalytics() && !this.isInitialized) {
            this.loadGoogleAnalytics();
            this.isInitialized = true;
        }
    }

    private canUseAnalytics(): boolean {
        const consent = this.cookieService.get('cookie-consent');
        return consent === 'accepted' || consent === 'partial';
    }

    private loadGoogleAnalytics() {
        // Charger le script Google Analytics
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA_ID}`;
        document.head.appendChild(script);

        script.onload = () => {
            gtag('js', new Date());
            gtag('config', this.GA_ID, {
                page_title: document.title,
                page_location: window.location.href
            });
        };
    }

    trackEvent(action: string, category: string, label?: string, value?: number) {
        if (this.canUseAnalytics() && typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }
    }

    trackPageView(url: string, title: string) {
        if (this.canUseAnalytics() && typeof gtag !== 'undefined') {
            gtag('config', this.GA_ID, {
                page_path: url,
                page_title: title
            });
        }
    }
}