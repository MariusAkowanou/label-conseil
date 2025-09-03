import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// Interface pour les données de contact
export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  contactType?: 'recruiter' | 'join' | 'evolve' | 'career';
  opportunity?: string;
  expertise?: string;
  linkedin?: string;
  cv?: File | null;
  currentPosition?: string;
  requestType?: string;
  details?: string;
  comment?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/contacts/`;

  constructor() { }

  /**
   * Envoie les informations de contact vers l'API
   * @param contactData - Les données du formulaire de contact
   * @returns Observable de la réponse de l'API
   */
  submitInformationContact(contactData: ContactData): Observable<any> {
    // Créer FormData pour gérer les fichiers (CV)
    const formData = new FormData();

    // Ajouter tous les champs texte
    Object.keys(contactData).forEach(key => {
      const value = contactData[key as keyof ContactData];
      if (value !== null && value !== undefined && value !== '') {
        if (key === 'cv' && value instanceof File) {
          formData.append(key, value);
        } else if (key !== 'cv') {
          formData.append(key, String(value));
        }
      }
    });

    return this.http.post(this.baseUrl, formData);
  }
}
