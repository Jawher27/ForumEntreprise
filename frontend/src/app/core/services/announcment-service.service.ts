import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Announcement } from '../models/Announcment';
import { Observable, map } from 'rxjs';


// const AddType_URL= "http://localhost:9091/announcementType/addAnnonce";
@Injectable({
  providedIn: 'root'
})
export class AnnouncmentServiceService {
  private baseURLAnnonce = "http://localhost:9090/announcement";

  constructor(private http: HttpClient) { }

  addAnnouncementWithType(libelle: string, announcement: Announcement, iduser:number): Observable<Announcement> {
    return this.http.post<Announcement>(`${this.baseURLAnnonce}/addA/${libelle}/${iduser}`, announcement);
  }


  // addAnnouncementWithTypeAndImage(libelle: string, announcement: Announcement, iduser: number, files: File[]): Observable<Announcement> {
  //   const formData: FormData = new FormData();
  //   formData.append('announcement', JSON.stringify(announcement)); // Ajoutez l'objet Announcement au FormData

  //   // Ajoutez chaque fichier au FormData
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append('imageFile', files[i]);
  //   }

  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   headers.append('Accept', 'application/json');

  //   // Utilisez les options avec le type d'objet 'response' pour récupérer la réponse complète de la requête (y compris l'en-tête)
  //   return this.http.post<Announcement>(`${this.baseURLAnnonce}/addwithpic/${libelle}/${iduser}`, formData, { headers: headers, observe: 'response' })
  //     .pipe(
  //       map(response => {
  //         // Si besoin est, vous pouvez traiter la réponse ici
  //         return response.body as Announcement; // Retourne le corps de la réponse (l'objet Announcement)
  //       })
  //     );
  // }


  recommendAnnouncements(typeLibelle: string, requiredSupply: number): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.baseURLAnnonce}/recommend/${typeLibelle}/${requiredSupply}`);
  }

  getAnnouncementsByUserId(userId: number): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.baseURLAnnonce}/user/${userId}`);
  }

  deleteAnnouncement(id: number) {
    return this.http.delete(`${this.baseURLAnnonce}/${id}`);
  }

}
