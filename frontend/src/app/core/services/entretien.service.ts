import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entretien } from 'src/app/core/models/Entretien'; // Assurez-vous d'importer le modèle Entretien
import { Condidature } from '../models/condidature';
import { EtatCondidature } from '../models/condidature';
@Injectable({
  providedIn: 'root'
})
export class EntretienService {

  private baseUrl = 'http://localhost:9090'; // Base URL of your Spring Boot backend

  constructor(private http: HttpClient) { }

  getAllEntretiens(): Observable<Entretien[]> {
    return this.http.get<Entretien[]>(`${this.baseUrl}/entretien/all`);
  }

  addEntretien(entretien: Entretien, idcondidature: number, etatCondidature: EtatCondidature): Observable<Entretien> {
    const url = `${this.baseUrl}/entretien/add/${idcondidature}/${etatCondidature}`;
    return this.http.post<Entretien>(url, entretien);
  }

  updateEntretien(entretien: Entretien): Observable<Entretien> {
    return this.http.put<Entretien>(`${this.baseUrl}/entretien`, entretien);
  }

  deleteEntretien(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/entretien/${id}`);
  }
} 
