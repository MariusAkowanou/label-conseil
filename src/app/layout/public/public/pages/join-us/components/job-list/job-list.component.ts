import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Job, JobsService } from '../../../../../../../shared/services/api/jobs.service';
import { JobFiltersComponent } from '../job-filters/job-filters.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [RouterModule, JobFiltersComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {
  private jobsService = inject(JobsService);

  @Input() companyName: string = '';

  @Output() jobSelected = new EventEmitter<Job>();

  // Signaux pour la gestion d'état
  jobs = signal<Job[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  selectedCity = signal<string>('all');
  selectedContractType = signal<string>('all');
  searchQuery = signal<string>('');

  ngOnInit() {
    this.loadJobs();
  }

  /**
   * Charge tous les emplois depuis l'API
   */
  private loadJobs() {
    this.isLoading.set(true);
    this.error.set(null);

    this.jobsService.getAllJobs().subscribe({
      next: (jobs: any) => {
        this.jobs.set(jobs.results);
        this.isLoading.set(false);
      },
      error: (error: any) => {
        this.error.set('Erreur lors du chargement des emplois');
        this.isLoading.set(false);
      }
    });
  }

  // Getters pour les jobs filtrés
  get filteredJobs() {
    const config = this.jobs();
    if (!config) return [];

    let jobs = config;

    if (this.selectedCity() !== 'all') {
      jobs = jobs.filter((job: any) => job.location === this.selectedCity());
    }

    if (this.selectedContractType() !== 'all') {
      jobs = jobs.filter((job: any) => job.type === this.selectedContractType());
    }

    const query = this.searchQuery().toLowerCase();
    if (query) {
      jobs = jobs.filter((job: any) =>
        job.title.toLowerCase().includes(query) ||
        job.expertise.toLowerCase().includes(query)
      );
    }

    return jobs;
  }

  get availableCities() {
    const config = this.jobs();
    if (!config) return [];
    return [...new Set(config.map((job: any) => job.location))];
  }

  get availableContractTypes() {
    const config = this.jobs();
    if (!config) return [];
    return [...new Set(config.map((job: any) => job.type))];
  }

  // Actions des filtres
  onCityChanged(city: string) {
    this.selectedCity.set(city);
  }

  onContractChanged(type: string) {
    this.selectedContractType.set(type);
  }

  onSearchChanged(query: string) {
    this.searchQuery.set(query);
  }

  /**
   * Sélectionne un emploi
   */
  selectJob(job: Job) {
    this.jobSelected.emit(job);
  }

  /**
   * Recharge les emplois
   */
  refreshJobs() {
    this.loadJobs();
  }
}