import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Offre} from '../models/Offre';
import {environment} from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class OfferService {

    private baseUrl = `${environment.apiUrl}/offer`; // Base URL of your Spring Boot backend

    constructor(private http: HttpClient) {
    }

    getAllOffers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/getAllOffers`);
    }

    addOffer(offre, id: number): Observable<any> {
        const url = `${this.baseUrl}/add-offer/${id}`;
        return this.http.post<Offre>(url, offre);
    }

    updateOffre(offre: any): Observable<any> {
        return this.http.put<Offre>(`${this.baseUrl}/Update Offre`, offre);
    }

    deletOffre(idOffre: Number): Observable<any> {
        const url = `${this.baseUrl}/${idOffre}`;
        return this.http.delete<void>(url);
    }

    getOffersByUserId(id: number): Observable<Offre[]> {
        const url = `${this.baseUrl}/OfferByIDuser/${id}`;
        return this.http.get<Offre[]>(url);
    }

    getSuggestedOffers(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/suggsetOffer/${id}`);
    }

}
