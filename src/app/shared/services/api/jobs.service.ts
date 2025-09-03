import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

// Interface pour les données d'emploi
export interface Job {
    id: number;
    title: string;
    description: string;
    location: string;
    expertise: string;
    type: string;
    experience_level: string;
    salary_range?: string;
    requirements: string[];
    benefits: string[];
    company: string;
    posted_date: string;
    deadline?: string;
    is_active: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class JobsService {
    private http = inject(HttpClient);
    private jobsConfig$: Observable<any> | null = null;
    private baseUrl = `${environment.apiUrl}/jobs`;

    // Méthode pour récupérer la configuration locale (fallback)
    getJobsConfig(): Observable<any> {
        if (!this.jobsConfig$) {
            this.jobsConfig$ = this.http.get<any>('/assets/config/jobs.config.json')
                .pipe(shareReplay(1));
        }
        return this.jobsConfig$;
    }

    // ===== MÉTHODES CRUD POUR L'API BACKEND =====

    /**
     * Récupère tous les emplois depuis l'API
     * @returns Observable<Job[]> - Liste de tous les emplois
     */
    getAllJobs(): Observable<Job[]> {
        return this.http.get<Job[]>(`${this.baseUrl}/`);
    }

    /**
     * Récupère un emploi par son ID depuis l'API
     * @param id - ID de l'emploi
     * @returns Observable<Job> - Détails de l'emploi
     */
    getJobById(id: number): Observable<Job> {
        return this.http.get<Job>(`${this.baseUrl}/${id}/`);
    }

    /**
     * Filtre les emplois côté client par localisation
     * @param jobs - Liste des emplois à filtrer
     * @param location - Localisation recherchée
     * @returns Job[] - Liste des emplois filtrés
     */
    filterJobsByLocation(jobs: Job[], location: string): Job[] {
        if (!location || location.trim() === '') return jobs;
        return jobs.filter(job =>
            job.location.toLowerCase().includes(location.toLowerCase())
        );
    }

    /**
     * Filtre les emplois côté client par expertise
     * @param jobs - Liste des emplois à filtrer
     * @param expertise - Expertise recherchée
     * @returns Job[] - Liste des emplois filtrés
     */
    filterJobsByExpertise(jobs: Job[], expertise: string): Job[] {
        if (!expertise || expertise.trim() === '') return jobs;
        return jobs.filter(job =>
            job.expertise.toLowerCase().includes(expertise.toLowerCase())
        );
    }

    /**
     * Filtre les emplois actifs côté client
     * @param jobs - Liste des emplois à filtrer
     * @returns Job[] - Liste des emplois actifs
     */
    filterActiveJobs(jobs: Job[]): Job[] {
        return jobs.filter(job => job.is_active);
    }

    /**
     * Recherche d'emplois avec filtres multiples côté client
     * @param jobs - Liste des emplois à filtrer
     * @param filters - Objet contenant les filtres de recherche
     * @returns Job[] - Liste des emplois correspondants
     */
    searchJobs(jobs: any, filters: {
        location?: string;
        expertise?: string;
        type?: string;
        experience_level?: string;
        is_active?: boolean;
    }): any[] {
        // Vérifier que jobs est un tableau valide
        if (!jobs || !Array.isArray(jobs)) {
            return [];
        }

        let filteredJobs = [...jobs];

        if (filters.location) {
            filteredJobs = this.filterJobsByLocation(filteredJobs, filters.location);
        }

        if (filters.expertise) {
            filteredJobs = this.filterJobsByExpertise(filteredJobs, filters.expertise);
        }

        if (filters.type) {
            filteredJobs = filteredJobs.filter(job =>
                job.type.toLowerCase().includes(filters.type!.toLowerCase())
            );
        }

        if (filters.experience_level) {
            filteredJobs = filteredJobs.filter(job =>
                job.experience_level.toLowerCase().includes(filters.experience_level!.toLowerCase())
            );
        }

        if (filters.is_active !== undefined) {
            filteredJobs = filteredJobs.filter(job => job.is_active === filters.is_active);
        }

        return filteredJobs;
    }
}