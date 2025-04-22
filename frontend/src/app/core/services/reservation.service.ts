import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/Reservation';
import { TypePack } from '../models/Pack';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseURL = "http://localhost:9090/reservation"

  constructor(private httpClient: HttpClient){}

  
  getAllReservation(): Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>(`${this.baseURL}/all`);
  }
  
  SaveReservation(idUser: number, idStand: number): Observable<Reservation[]> {
    return this.httpClient.post<Reservation[]>(`${this.baseURL}/add/${idUser}/${idStand}`, {});
  }
  
  UpdateReservation(reser: Reservation,reservationId :number): Observable<Reservation[]> {
    return this.httpClient.put<Reservation[]>(`${this.baseURL}/update/${reservationId}`, reser);
  }
  DeleteReservation(reservationId :number):Observable<Reservation[]> {
    return this.httpClient.delete<Reservation[]>(`${this.baseURL}/delete/${reservationId}`);
  }
  getMyReservation(idUser:number): Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>(`${this.baseURL}/findUser/${idUser}`);
  }
  findByType(type:TypePack): Observable<Reservation[]>{
    return this.httpClient.get<Reservation[]>(`${this.baseURL}/find/${type}`);
  }

}
