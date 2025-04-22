import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeAnnonce } from '../models/typeAnnonce';
import { Observable } from 'rxjs';
import { Announcement } from '../models/Announcment';

@Injectable({
  providedIn: 'root'
})
export class TypeAnnouncementService {
  private baseURL = "http://localhost:9090/announcementtype";
  private baseURLAnnonce = "http://localhost:9090/announcement";


  constructor(private http: HttpClient) { }

  getAllTypes(): Observable<TypeAnnonce[]> {
    return this.http.get<TypeAnnonce[]>(`${this.baseURL}/findall`);
  }
  getLibelles(libelle:String): Observable<TypeAnnonce> {
    return this.http.get<TypeAnnonce>(`${this.baseURL}/findByLib/${libelle}`);
  }
  
  
  SaveType(type: TypeAnnonce): Observable<TypeAnnonce> { 
    return this.http.post<TypeAnnonce>(`${this.baseURL}/add`, type); 
  }

  DeleteType(idType: number): Observable<TypeAnnonce[]> {
    return this.http.delete<TypeAnnonce[]>(`${this.baseURL}/delete/${idType}`);
  }

  getAnnouncementsByType(typeId: number): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.baseURLAnnonce}/recommend/${typeId}`);
  }
  
  addType(typeAnnouncementDto:any): Observable<any>{
    return this.http.post(`${this.baseURL}/Type`, typeAnnouncementDto);
  }

  UpdateTtpe(type: TypeAnnonce,TypeId :number): Observable<TypeAnnonce[]> {
    return this.http.put<TypeAnnonce[]>(`${this.baseURL}/update/${TypeId}`, type);
  }
  
}
