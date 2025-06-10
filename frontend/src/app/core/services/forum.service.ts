import { Injectable } from '@angular/core';
import { Forum } from '../models/Forum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private baseURL = environment.apiUrl + '/forum';

  constructor(private httpClient: HttpClient) {}
 

  getAllForoms(): Observable<Forum[]> {
    return this.httpClient.get<Forum[]>(`${this.baseURL}/all`);
  }
  SaveForum(forum: Forum): Observable<Forum[]> {
    return this.httpClient.post<Forum[]>(`${this.baseURL}/add`, forum);
  }
  UpdateForum(forum: Forum,forumId :number): Observable<Forum[]> {
    return this.httpClient.put<Forum[]>(`${this.baseURL}/update/${forumId}`, forum);
  }
  DeleteForum(forumId :number):Observable<Forum[]> {
    return this.httpClient.delete<Forum[]>(`${this.baseURL}/delete/${forumId}`);
  }
  getLatestForum(): Observable<Forum> {
    return this.httpClient.get<Forum>(`${this.baseURL}/lastForum`);
  }
}
