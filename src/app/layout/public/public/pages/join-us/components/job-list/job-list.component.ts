import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Job, JobsService } from '../../../../../../../shared/services/api/jobs.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {
  private jobsService = inject(JobsService);

  @Input() companyName: string = '';
  @Input() filters: {
    location?: string;
    expertise?: string;
    type?: string;
    experience_level?: string;
    is_active?: boolean;
  } = {};

  @Output() jobSelected = new EventEmitter<Job>();

  // Signaux pour la gestion d'état
  jobs = signal<Job[]>([]);
  filteredJobs = signal<Job[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

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

        this.applyFilters();
        this.isLoading.set(false);
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des emplois:', error);
        this.error.set('Erreur lors du chargement des emplois');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Applique les filtres aux emplois
   */
  private applyFilters() {
    const allJobs = this.jobs() as Job[];
    const filtered = this.jobsService.searchJobs(allJobs, this.filters);
    this.filteredJobs.set(filtered);
  }

  /**
   * Met à jour les filtres et applique le filtrage
   */
  updateFilters(newFilters: typeof this.filters) {
    this.filters = { ...newFilters };
    this.applyFilters();
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