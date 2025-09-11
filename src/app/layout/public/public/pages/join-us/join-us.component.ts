import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';;

// Import des composants
import { CompanyStatsComponent } from './components/company-stats/company-stats.component';
import { JobFiltersComponent } from './components/job-filters/job-filters.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { SeoService } from '../../../../../shared/services/local/seo.service';

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [
    RouterModule,
    CompanyStatsComponent,
    JobFiltersComponent,
    JobListComponent
  ],
  templateUrl: './join-us.component.html',
  styleUrl: './join-us.component.scss'
})
export class JoinUsComponent implements OnInit {
  private seo = inject(SeoService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  jobsConfig = signal<any | null>(null);

  // Filtres
  selectedCity = signal<string>('all');
  selectedContractType = signal<string>('all');
  searchQuery = signal<string>('');

  ngOnInit() {
    this.seo.updateSeo({
      title: 'Nous Rejoindre - Label Conseils',
      description: 'Rejoignez Label Conseils et participez à des projets innovants.',
      keywords: 'emploi label conseils, recrutement, carrière',
      url: '/nous-rejoindre'
    });

    this.loadJobsData();

    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimations();
    }
  }

  private loadJobsData() {
    this.http.get<any>('/assets/config/jobs.config.json')
      .subscribe({
        next: (data) => {
          this.jobsConfig.set(data);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des offres:', error);
        }
      });
  }

  

  onJobSelected(job: any) {
    this.router.navigate(['/nous-rejoindre', job.id]);
  }

  private setupScrollAnimations() {
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

    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }, 100);
  }
}