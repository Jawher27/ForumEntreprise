import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/core/models/Reservation';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-mes-res',
  templateUrl: './mes-res.component.html',
  styleUrls: ['./mes-res.component.css']
})
export class MesResComponent implements OnInit {
  res: Reservation[];
  currentUser: User;

  constructor(private reservationService: ReservationService, private authService: AuthService) { }
  id: number;

  ngOnInit(): void {
    /********Get the connected user*********/
    this.authService.CurrentUser().subscribe(
      (user: User) => {
        this.currentUser = user;
        console.log('Utilisateur connecté : ', this.currentUser);
        // Maintenant que currentUser est défini, appelez getMyRes() ici
        this.getMyRes(this.currentUser.id);
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
      }
    );
  }

  getMyRes(id:number) {
    if (this.currentUser) {
      this.reservationService.getMyReservation(id).subscribe(
        data => {
          this.res = data;
        }
      );
    }
  }
}
