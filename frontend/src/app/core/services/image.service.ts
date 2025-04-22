import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private uploadUrl = 'http://localhost:8080/user/upload';

  constructor(private http: HttpClient) {
  }

  uploadImage(file: File, user: any) {
    const formData = new FormData();
    formData.append('file', file.name); // Envoyer uniquement le nom du fichier
    formData.append('user', JSON.stringify(user));

    return this.http.post(this.uploadUrl, formData);
  }
  getImageById(id: string) {
    const url = `${this.uploadUrl}/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

}
