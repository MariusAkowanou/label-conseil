import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface ExperienceThematique {
  id: number;
  nom: string;
  slug: string;
  description: string;
  icone: string;
  ordre: number;
  nombre_experiences: number;
}

export interface ExperienceSummary {
  id: number;
  titre: string;
  slug: string;
  description_courte: string;
  thematique: string;
  thematique_slug: string;
  type_experience: string;
  client: string;
  secteur: string;
  date_debut: string;
  date_fin: string | null;
  en_cours: boolean;
  duree: number | null;
  image_principale: string | null;
  image_url: string | null;
  featured: boolean;
  nombre_competences: number;
}

export type ExperienceDetail = ExperienceSummary & {
  contenu?: string;
  objectifs?: string[];
  resultats?: string[];
  temoignages?: {
    auteur: string;
    fonction?: string;
    citation: string;
  }[];
};

export interface ExperienceFilters {
  thematique?: string | null;
  type?: string | null;
  featured?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private http = inject(HttpClient);
  private apiBase = `${environment.apiUrl}`;

  /**
   * Récupère la liste des thématiques disponibles
   */
  getThematiques(): Observable<any> {
    return this.http.get<any>(`${this.apiBase}/thematiques/`);
  }

  /**
   * Récupère la liste des expériences avec filtres optionnels
   */
  getExperiences(filters: any): Observable<any> {
    let params = new HttpParams();

    if (filters.thematique) {
      params = params.set('thematique', filters.thematique);
    }

    if (filters.type && filters.type !== 'all') {
      params = params.set('type', filters.type);
    }

    if (filters.featured !== undefined) {
      params = params.set('featured', filters.featured ? 'true' : 'false');
    }

    return this.http.get<any>(`${this.apiBase}/experiences/`, { params });
  }

  /**
   * Récupère le détail d'une expérience à partir de son slug
   */
  getExperienceDetail(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiBase}/experiences/${slug}/`);
  }
}
