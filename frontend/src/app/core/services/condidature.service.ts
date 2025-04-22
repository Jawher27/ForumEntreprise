import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Condidature } from '../models/condidature';

@Injectable({
  providedIn: 'root'
})
export class CondidatureService {
  private baseUrl = 'http://localhost:9090/condidature'; // Base URL of your Spring Boot backend

  constructor(private http: HttpClient) { }
  submitCandidature(offreId: number, userId: number, etatCondidature: string,
                    coverLetter: File, cv: File): Observable<any> {
    const formData = new FormData();
    formData.append('coverLetter', coverLetter);
    formData.append('cv', cv);

    return this.http.post<Condidature>(
        `${this.baseUrl}/upload/${offreId}/${userId}?etatCondidature=${etatCondidature}`,
        formData
    );
  }


  getCandidature(id: number): Observable<Condidature> {
    return this.http.get<Condidature>(`${this.baseUrl}/${id}`);
  }
  getCandidaturesByUserId(id: number): Observable<Condidature[]> {
    return this.http.get<Condidature[]>(`${this.baseUrl}/GetCanditaturesbyUser/${id}`);
  }

  getCondidaturesByOffre(idOffre: number): Observable<Condidature[]> {
    return this.http.get<Condidature[]>(`${this.baseUrl}/GetCanditaturesbyOffre/${idOffre}`);
  }

  // Télécharger le CV
  downloadCV(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/cv`, {
      responseType: 'blob'
    });
  }

  // Télécharger la lettre de motivation
  downloadCoverLetter(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/cover-letter`, {
      responseType: 'blob'
    });
  }

  // Obtenir toutes les candidatures (si nécessaire)
  getAllCandidatures(): Observable<Condidature[]> {
    return this.http.get<Condidature[]>(`${this.baseUrl}`);
  }



  getAllCondidatures(): Observable<Condidature[]> {
    return this.http.get<Condidature[]>(`${this.baseUrl}/condidature/all`);
  }
  addCondidature(condidature: Condidature, idOffer: number, id: number): Observable<Condidature> {
    return this.http.post<Condidature>(`${this.baseUrl}/condidature/add/${idOffer}/${id}`, condidature);
  }
  updateCondidature(condidature: Condidature): Observable<Condidature> {
    return this.http.put<Condidature>(`${this.baseUrl}/condidature/update`, condidature);
  }

  deleteCondidature(idCondidature: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/condidature/delete/${idCondidature}`);
  }
}
