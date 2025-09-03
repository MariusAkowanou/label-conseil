import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JobsService } from '../../../../../shared/services/api/jobs.service';
import { SeoService } from '../../../../../shared/services/local/seo.service';
import { JobModalComponent } from './components/job-modal/job-modal.component';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [RouterModule, JobModalComponent],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.scss'
})
export class JobDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private jobsService = inject(JobsService);
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  job = signal<any>(null);
  showModal = signal(false);
  isLoading = signal(true);
  notFound = signal(false);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const jobId = params['id'];
      if (jobId) {
        this.loadJob(jobId);
      } else {
        this.router.navigate(['/nous-rejoindre']);
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimations();
    }
  }

  private loadJob(jobId: any) {
    this.isLoading.set(true);
    this.notFound.set(false);

    // Utilisation du service JobsService
    this.jobsService.getJobById(jobId).subscribe({
      next: (config) => {
        const jobData = config

        if (jobData) {
          this.job.set(jobData);
          this.updateSEO(jobData);
        } else {
          this.notFound.set(true);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'offre:', error);
        this.notFound.set(true);
        this.isLoading.set(false);
      }
    });
  }

  private updateSEO(job: any) {
    this.seo.updateSeo({
      title: `${job.title} - Label Conseils`,
      description: job.about.mission,
      keywords: `emploi, ${job.title.toLowerCase()}, ${job.expertise.toLowerCase()}, label `,
      url: `/nous-rejoindre/${job.id}`,
      type: 'article'
    });
  }

  openApplicationModal() {
    this.showModal.set(true);
    this.router.navigate(['/formulaire-de-candidature', this.job()!.id]);
 
  }

  

  goBack() {
    this.router.navigate(['/nous-rejoindre']);
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