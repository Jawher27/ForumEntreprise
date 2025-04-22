import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Pack, TypePack } from 'src/app/core/models/Pack';
import { Reservation } from 'src/app/core/models/Reservation';
import { Stand } from 'src/app/core/models/Stand';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { PackService } from 'src/app/core/services/pack.service';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { StandService } from 'src/app/core/services/stand.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  closeResult: string;
  @ViewChild('classicD') classicD: any;
  @ViewChild('classicS') classicS: any;
  @ViewChild('classicG') classicG: any;

  constructor(private modalService: NgbModal,private packService: PackService,private standService:StandService,private reservationService:ReservationService,private authService:AuthService) { }
  packD :Pack=new Pack();
  packG :Pack=new Pack();
  packS :Pack=new Pack();

  stands:Stand[];
  standsAffecter:Stand[];
  currentUser:User;

  selectedStandId: number | null = null;

  onSelectStand(standId: number) {
     const selectedStand = this.stands.find(stand => stand.idStand === standId);
    if (selectedStand && selectedStand.disponible) {
      this.selectedStandId = standId;
    }
  }
  ngOnInit(): void {
    this.getPackByD();
    this.getPackByG();
    this.getPackByS();



/********Get the user connected*********/
this.authService.CurrentUser().subscribe(
  (user: User) => {
      this.currentUser = user;

      console.log('Utilisateur connecté : ', this.currentUser);
  },
  (error) => {
      console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
  }
);
/***********************************/


  }
 
  standAppartientAuPackD(stand: Stand): boolean {
    return stand.pack && stand.pack.typePack === 'DIAMANT';
  }
  standAppartientAuPackG(stand: Stand): boolean {
    return stand.pack && stand.pack.typePack === 'GOLD';
  }
  standAppartientAuPackS(stand: Stand): boolean {
    return stand.pack && stand.pack.typePack === 'SILVER';
  }
  

  private getPackByD(){
      this.packService.FindByType(TypePack.DIAMANT).subscribe(data=>{
        this.packD=data;
      })
  }
  private getPackByG(){
    this.packService.FindByType(TypePack.GOLD).subscribe(data=>{
      this.packG=data;
    })
}
  private getPackByS(){
  this.packService.FindByType(TypePack.SILVER).subscribe(data=>{
    this.packS=data;
  })
}


openStandsD(){
  this.open(this.classicD, 'Notification', '');
  this.selectedStandId=null;
  //charger les stand du bd
  this.standService.getAllStand().subscribe(data =>{
    this.stands = data ;
   }); 
}
openStandsS(){
  this.open(this.classicS, 'Notification', '');
  this.selectedStandId=null;
  //charger les stand du bd
  this.standService.getAllStand().subscribe(data =>{
    this.stands = data ;
   }); 
}
openStandsG(){
  this.open(this.classicG, 'Notification', '');
  this.selectedStandId=null;
  //charger les stand du bd
  this.standService.getAllStand().subscribe(data =>{
    this.stands = data ;
   }); 
}


open(content, type, modalDimension) {
  if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  } else if (modalDimension === '' && type === 'Notification') {
    this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } else {
      this.modalService.open(content,{ centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}
refreshStands() {
  this.standService.getAllStand().subscribe(data => {
    this.stands = data;
  });
}
Reserver(){
  if (this.selectedStandId) {
    this.reservationService.SaveReservation(this.currentUser.id, this.selectedStandId).subscribe(
      (reservations: Reservation[]) => {
        console.log('Réservation effectuée avec succès.', reservations);
       
        this.refreshStands(); // Rafraîchir l'affichage des stands
        alert('Réservation effectuée avec succès.');
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la réservation :', error);
        alert('Une erreur s\'est produite lors de la réservation.');
      }
    );
  } else {
    console.warn('Aucun stand sélectionné.');
    alert('Aucun stand sélectionné.');
  }


}

}
