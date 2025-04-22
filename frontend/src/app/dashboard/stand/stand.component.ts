import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TypePack } from 'src/app/core/models/Pack';
import { Stand } from 'src/app/core/models/Stand';
import { PackService } from 'src/app/core/services/pack.service';
import { StandService } from 'src/app/core/services/stand.service';
export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}
@Component({
  selector: 'app-stand',
  templateUrl: './stand.component.html',
  styleUrls: ['./stand.component.css']
})
export class StandComponent implements OnInit {
  Stands:Stand[];
  s:Stand=new Stand();
  closeResult: string;
@ViewChild('classic1') classic1: any;
@ViewChild('classic2') classic2: any;
@ViewChild('classic3') classic3: any;

typePackEnum = [
  {label:'GOLD',value:'GOLD'},
  {label:'SILVER',value:'SILVER'},
  {label:'DIAMANT',value:'DIAMANT'}
 // {label:'FREE',value:'FREE'}
];
typePack:TypePack;
public alerts: Array<IAlert> = [];

  constructor(private modalService: NgbModal,private standService:StandService,private packService:PackService) { }

  ngOnInit(): void {
    this.getAllStands();
    console.log("Packs value",this.Stands);
  }
  private getAllStands(){
    this.standService.getAllStand().subscribe(data =>{
         this.Stands = data ;
     });
 }
 openAdd(){
  this.open(this.classic2, 'modal_mini', 'sm');
}
idStand:number;
OpenAffecterPack(id:number){
  this.idStand=id;
  this.open(this.classic3, 'modal_mini', 'sm');

}
AffecterPack(){
  //console.log("hello ",this.idStand,this.typePack)
  console.log("type selectionner",this.typePack);
  this.packService.affectePackToStand(this.typePack,this.idStand).subscribe(
    response => {
      console.log('Affectation réussie :', response);
      this.getAllStands();
    },
    error => {
      console.error('Erreur lors de l\'affectation du pack au stand :', error);
      // Gérer les erreurs ici
    }
    
  );
  this.modalService.dismissAll();
}





onSubmitForm(){
  this.s.disponible = true;
  console.log("stand value",this.s);
  this.standService.SaveStand(this.s)
  .subscribe(response => {
    console.log('Stand saved successfully:', response);
   this.getAllStands();
    this.modalService.dismissAll();

  }, error => {
    console.error('Error saving Stand:', error);
  });
 }
 delete(id:number): void {
  this.standService.DeleteStand(id).subscribe(
    response => {
      console.log('Stand deleted successfully:', response);
      // Actualiser la liste des forums après la suppression
      this.standService.getAllStand().subscribe(
        Stands => {
          // Mettre à jour la liste des forums dans le composant
          this.Stands = Stands;
        },
        error => {
          console.error('Error refreshing table:', error);
        }
      );
      // Ajouter une alerte de succès
      this.alerts.push({
        id: this.alerts.length + 1,
        type: 'success',
        strong: 'Success!',
        message: 'stand deleted successfully',
        icon: 'ni ni-like-2'
      });
    },
    error => {
      console.error('Error deleting forum:', error);
      // Ajouter une alerte d'avertissement
      this.alerts.push({
        id: this.alerts.length + 1,
        type: 'warning',
        strong: 'Warning!',
        message: 'Error deleting forum: ' + error.message,
        icon: 'ni ni-bell-55'
      });
    }
  );
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


}
