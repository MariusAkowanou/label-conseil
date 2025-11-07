import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Expertise, ExpertiseConfig } from '../../../../../shared/model/expertise.interface';
import { SeoService } from '../../../../../shared/services/local/seo.service';

@Component({
  selector: 'app-list-experience',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-experience.component.html',
  styleUrl: './list-experience.component.scss'
})
export class ListExperienceComponent implements OnInit {
  private router = inject(Router);
  private http = inject(HttpClient);
  private seo = inject(SeoService);

  expertises = signal<Expertise[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.loadExpertises();
    this.updateSEO();
  }

  private loadExpertises() {
    this.isLoading.set(true);

    this.http.get<ExpertiseConfig>('/assets/config/expertises.config.json')
      .subscribe({
        next: (config) => {
          this.expertises.set(config.expertises);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des expertises:', error);
          this.isLoading.set(false);
        }
      });
  }

  navigateToExpertise(slug: string) {
    this.router.navigate(['/expertises', slug]);
  }

  private updateSEO() {
    this.seo.updateSeo({
      title: 'Nos Expertises - Label Conseils',
      description: 'Découvrez nos domaines d\'expertise en recrutement : conseil en stratégie, transformation digitale, développement territorial, gestion financière et plus encore.',
      keywords: 'expertises, recrutement, conseil, stratégie, digital, transformation, RH, finance, juridique',
      url: '/expertises',
      type: 'website'
    });
  }
}