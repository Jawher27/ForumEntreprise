import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stand } from '../models/Stand';
import { TypePack } from '../models/Pack';

@Injectable({
  providedIn: 'root'
})
export class StandService {
  private baseURL = "http://localhost:9090/stand"

  constructor(private httpClient: HttpClient){}

  
  getAllStand(): Observable<Stand[]>{
    return this.httpClient.get<Stand[]>(`${this.baseURL}/all`);
  }
  SaveStand(stand: Stand): Observable<Stand[]> {
    return this.httpClient.post<Stand[]>(`${this.baseURL}/add`, stand);
  }
  UpdateStand(stand: Stand,standId :number): Observable<Stand[]> {
    return this.httpClient.put<Stand[]>(`${this.baseURL}/update/${standId}`, stand);
  }
  DeleteStand(standId :number):Observable<Stand[]> {
    return this.httpClient.delete<Stand[]>(`${this.baseURL}/delete/${standId}`);
  }
  getStandByTypePack(type:TypePack): Observable<Stand[]>{
    return this.httpClient.get<Stand[]>(`${this.baseURL}/{type}`);
  }
}
