import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JointUsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/applications/`;
  constructor() { }
  submitApplication(application: any): Observable<any> {
    return this.http.post(this.baseUrl, application);
  }
}
