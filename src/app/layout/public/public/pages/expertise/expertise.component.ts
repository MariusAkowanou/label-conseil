import { Component, OnInit, inject, signal, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Expertise, ExpertiseConfig } from '../../../../../shared/model/expertise.interface';
import { SeoService } from '../../../../../shared/services/local/seo.service';

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.scss'
})
export class ExpertiseComponent implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  expertise = signal<Expertise | null>(null);
  isLoading = signal(true);
  notFound = signal(false);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const expertiseSlug = params['slug'];
      if (expertiseSlug) {
        this.loadExpertise(expertiseSlug);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Petit délai pour s'assurer que le contenu est chargé
      setTimeout(() => {
        this.setupScrollAnimations();
      }, 100);
    }
  }

  private loadExpertise(slug: string) {
    this.isLoading.set(true);
    this.notFound.set(false);

    this.http.get<ExpertiseConfig>('/assets/config/expertises.config.json')
      .subscribe({
        next: (config) => {
          const expertiseData = config.expertises.find(e => e.slug === slug);

          if (expertiseData) {
            this.expertise.set(expertiseData);
            this.updateSEO(expertiseData);

            // Relancer les animations après le chargement des données
            setTimeout(() => {
              this.setupScrollAnimations();
            }, 50);
          } else {
            this.notFound.set(true);
          }

          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Erreur lors du chargement de l\'expertise:', error);
          this.notFound.set(true);
          this.isLoading.set(false);
        }
      });
  }

  private setupScrollAnimations() {
    if (!isPlatformBrowser(this.platformId)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px 0px -50px 0px' }
    );

    // Observer tous les éléments avec la classe animate-on-scroll
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      observer.observe(el);
    });
  }

  private updateSEO(expertise: Expertise) {
    this.seo.updateSeo({
      title: `${expertise.name} - Label Conseil`,
      description: expertise.description,
      keywords: `${expertise.name.toLowerCase()}, conseil, recrutement, expertise, ${expertise.slug}`,
      url: `/expertises/${expertise.slug}`,
      type: 'article'
    });
  }
}