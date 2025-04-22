import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pack, TypePack } from '../models/Pack';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackService {
  private baseURL = "http://localhost:9090/pack"

  constructor(private httpClient: HttpClient){}

  
  getAllPacks(): Observable<Pack[]>{
    return this.httpClient.get<Pack[]>(`${this.baseURL}/all`);
  }
  SavePack(pack: Pack): Observable<Pack[]> {
    return this.httpClient.post<Pack[]>(`${this.baseURL}/add`, pack);
  }
  UpdatePack(pack: Pack,packId :number): Observable<Pack[]> {
    return this.httpClient.put<Pack[]>(`${this.baseURL}/update/${packId}`, pack);
  }
  DeletePack(packId :number):Observable<Pack[]> {
    return this.httpClient.delete<Pack[]>(`${this.baseURL}/delete/${packId}`);
  }
  FindByType(type :TypePack):Observable<Pack>{
    return this.httpClient.get<Pack>(`${this.baseURL}/type/${type}`);
  }
  affectePackToStand(type: TypePack, idStand: number): Observable<any[]> {
    return this.httpClient.post<any[]>(`${this.baseURL}/affecte/${idStand}/${type}`, {});
  }


}
