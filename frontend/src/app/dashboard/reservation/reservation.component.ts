import { Component, OnInit } from '@angular/core';
import { TypePack } from 'src/app/core/models/Pack';
import { Reservation } from 'src/app/core/models/Reservation';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {
  typePackEnum = [
    {label:'GOLD',value:'GOLD'},
    {label:'SILVER',value:'SILVER'},
    {label:'DIAMANT',value:'DIAMANT'}
   // {label:'FREE',value:'FREE'}
  ];
reservations:Reservation[]
res:Reservation[]
  constructor(private reservationService:ReservationService) { }

  ngOnInit(): void {
    this.GetAllReservation();
    //console.log("hhhh",this.GetAllReservation())

  }
  GetAllReservation(){
    this.reservationService.getAllReservation().subscribe(data=>{
      this.reservations=data;
    });
  }
  typePack: TypePack;

  selectedType: TypePack;

  GetReservationByType(){
  
    this.reservationService.findByType(this.selectedType).subscribe(data => {
      this.reservations = data;
    });
  }

}
