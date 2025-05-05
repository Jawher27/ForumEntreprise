import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of, throwError  } from 'rxjs';

import { Condidature } from '../models/condidature';
import { Offre } from '../models/Offre';
import { catchError, map, switchMap } from 'rxjs/operators';

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


  updateEtatCondidature(idCondidature: number, condidature: Condidature): Observable<Condidature> {
    return this.http.put<Condidature>(`${this.baseUrl}/updateEtat/${idCondidature}`, condidature);
  }


  getCandidature(id: number): Observable<Condidature> {
    return this.http.get<Condidature>(`${this.baseUrl}/${id}`);
  }
  getCandidaturesByUserId(id: number): Observable<Condidature[]> {
    return this.http.get<Condidature[]>(`${this.baseUrl}/GetCanditaturesbyUser/${id}`);
  }
  getCandidaturesByUserIdAndOffre(id: number , idOffre: number): Observable<Condidature[]> {
    return this.http.get<Condidature[]>(`${this.baseUrl}/GetCanditaturesbyUserAnfOffre/${id}/${idOffre}`);
  }
  // Nouvelle méthode pour récupérer et enrichir les candidatures avec toutes les informations d'offres
  // getEnrichedCandidaturesByUserId(userId: number, offerService: { getAllOffers: () => Observable<Offre[]> }): Observable<Condidature[]> {
  //   return this.getCandidaturesByUserId(userId).pipe(
  //       switchMap((candidatures: Condidature[]) => {
  //         if (candidatures.length === 0) {
  //           return of([] as Condidature[]);
  //         }
  //
  //         return offerService.getAllOffers().pipe(
  //             map((offers: Offre[]) => {
  //               const offersMap = new Map<number, Offre>();
  //               offers.forEach(offer => offersMap.set(offer.idOffre, offer));
  //
  //               return candidatures.map(candidature => {
  //                 if (candidature.offre && candidature.offre.idOffre && offersMap.has(candidature.offre.idOffre)) {
  //                   candidature.offre = offersMap.get(candidature.offre.idOffre)!;
  //                 }
  //                 return candidature;
  //               });
  //             })
  //         );
  //       }),
  //       catchError(error => {
  //         console.error('Erreur lors de l\'enrichissement des candidatures:', error);
  //         return throwError(() => new Error('Erreur lors du chargement des données complètes des candidatures'));
  //       })
  //   );
  // }

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
