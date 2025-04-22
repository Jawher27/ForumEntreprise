import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Review } from '../models/Review'


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'http://localhost:9090'; // Base URL of your Spring Boot backend

  constructor(private http: HttpClient) { }

  getAllReviews(): Observable<any[]>
  {
    return this.http.get<any[]>(`${this.baseUrl}/Review/getAllReviews`);
  }

  addReviewAndAssignToOfferAndUser(review: Review, idOffre: number, id: number): Observable<Review> {
    const url = `${this.baseUrl}/Review/addReviewAndAssignToOffer/${idOffre}/${id}`;
    return this.http.put<Review>(url, review);
  }
}
