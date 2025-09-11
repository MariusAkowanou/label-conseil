import { Component, OnInit, signal, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MenuConfig } from '../../models/menu.interface';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  private http = inject(HttpClient);

  menuConfig = signal<MenuConfig | null>(null);
  currentYear = new Date().getFullYear();

  // Informations de contact et réseaux sociaux
  contactInfo = {
    email: 'support@nexacorp.bj',
    phone: '+229 XX XX XX XX',
    address: {
      street: 'Adresse à définir',
      city: 'Cotonou',
      country: 'Bénin'
    }
  };

  socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/label-conseil',
      icon: 'fab fa-linkedin-in'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/labelconseil',
      icon: 'fab fa-facebook-f'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/labelconseil',
      icon: 'fab fa-twitter'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/labelconseil',
      icon: 'fab fa-instagram'
    }
  ];

  legalLinks = [
    {
      label: 'Mentions légales',
      route: '/mentions-legales'
    },
    {
      label: 'Politique de confidentialité',
      route: '/politique-confidentialite'
    },
    {
      label: 'Conditions d\'utilisation',
      route: '/conditions-utilisation'
    },
    /*{
      label: 'Plan du site',
      route: '/plan-du-site'
    }*/
  ];

  ngOnInit() {
    this.loadMenuConfig();
  }

  private loadMenuConfig() {
    this.http.get<MenuConfig>('/assets/config/menu.config.json')
      .subscribe({
        next: (config) => {
          this.menuConfig.set(config);
        },
        error: (error) => {
          console.error('Erreur lors du chargement du menu pour le footer:', error);
        }
      });
  }

  // Organiser les liens de navigation en colonnes
  getNavigationColumns() {
    const config = this.menuConfig();
    if (!config) return [];

    // Séparer les liens simples des dropdowns
    const links = config.navigation.filter(item => item.type === 'link');
    const dropdowns = config.navigation.filter(item => item.type === 'dropdown');

    return {
      links,
      dropdowns
    };
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}