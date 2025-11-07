import { Component, OnInit, signal, inject, HostListener } from '@angular/core';

import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MenuConfig, MenuItem } from '../../models/menu.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private http = inject(HttpClient);

  menuConfig = signal<MenuConfig | null>(null);
  isMobileMenuOpen = signal(false);
  activeDropdown = signal<string | null>(null);
  activeMobileDropdown = signal<string | null>(null); // Séparé pour mobile
  isScrolled = signal(false);

  ngOnInit() {
    this.loadMenuConfig();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 10);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    // Fermer les dropdowns desktop si on clique en dehors
    if (!target.closest('.dropdown-container')) {
      this.activeDropdown.set(null);
    }
  }

  @HostListener('window:resize', [])  // ✅ CORRIGÉ ICI
  onResize() {
    // Fermer le menu mobile si on revient en mode desktop
    if (window.innerWidth >= 1024) { // lg breakpoint
      this.closeMobileMenu();
    }
  }

  private loadMenuConfig() {
    this.http.get<MenuConfig>('/assets/config/menu.config.json')
      .subscribe({
        next: (config) => {
          this.menuConfig.set(config);
        },
        error: (error) => {
          console.error('Erreur lors du chargement du menu:', error);
        }
      });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);

    // Empêcher le scroll du body quand le menu mobile est ouvert
    if (this.isMobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      this.activeMobileDropdown.set(null); // Fermer tous les dropdowns mobiles
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    this.activeMobileDropdown.set(null);
    document.body.style.overflow = '';
  }

  // === GESTION DESKTOP (hover) ===
  onDesktopDropdownEnter(label: string) {
    this.activeDropdown.set(label);
  }

  onDesktopDropdownLeave() {
    this.activeDropdown.set(null);
  }

  isDesktopDropdownOpen(label: string): boolean {
    return this.activeDropdown() === label;
  }

  // === GESTION MOBILE (click) ===
  toggleMobileDropdown(label: string) {
    if (this.activeMobileDropdown() === label) {
      this.activeMobileDropdown.set(null);
    } else {
      this.activeMobileDropdown.set(label);
    }
  }

  isMobileDropdownOpen(label: string): boolean {
    return this.activeMobileDropdown() === label;
  }
}