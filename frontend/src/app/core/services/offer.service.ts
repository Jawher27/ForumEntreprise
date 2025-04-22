import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Offre } from '../models/Offre'


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private baseUrl = 'http://localhost:9090'; // Base URL of your Spring Boot backend

  constructor(private http: HttpClient) { }

  getAllOffers(): Observable<any[]>
  {
    return this.http.get<any[]>(`${this.baseUrl}/offer/getAllOffers`);
  }
  addOffer(offre , id: number ): Observable<any> {
    const url = `${this.baseUrl}/offer/add-offer/${id}`;
    return this.http.post<Offre>(url, offre);
  }
  
  updateOffre(offre: any): Observable<any> {
    return this.http.put<Offre>(`${this.baseUrl}/offer/Update Offre`, offre);
  }
  
  deletOffre(idOffre: Number): Observable<any> {
    const url = `${this.baseUrl}/offer/${idOffre}`;
    return this.http.delete<void>(url);  }
  
  getOffersByUserId(id: number): Observable<Offre[]> {
      const url = `${this.baseUrl}/offer/OfferByIDuser/${id}`;
      return this.http.get<Offre[]>(url);
    }

    getSuggestedOffers(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/offer/suggsetOffer/${id}`);
    }

}
