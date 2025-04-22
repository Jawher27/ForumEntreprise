import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Pack} from 'src/app/core/models/Pack';
import { PackService } from 'src/app/core/services/pack.service';
export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}
@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class PackComponent implements OnInit {
Packs:Pack[];  
p : Pack=new Pack();
closeResult: string;

@ViewChild('classic1') classic1: any;
@ViewChild('classic2') classic2: any;
typePackEnum = [
  {label:'GOLD',value:'GOLD'},
  {label:'SILVER',value:'SILVER'},
  {label:'DIAMANT',value:'DIAMANT'}
 // {label:'FREE',value:'FREE'}
];
public alerts: Array<IAlert> = [];



  constructor(private modalService: NgbModal,private packService:PackService) { }

  ngOnInit(): void {
    this.getAllPacks();
    console.log("Packs value", this.getAllPacks());
  }

  private getAllPacks(){
    this.packService.getAllPacks().subscribe(data =>{
         this.Packs = data ;
     });
 }
 openAdd(){
  this.open(this.classic2, 'modal_mini', 'sm');
}
 onSubmitForm(){
  this.packService.SavePack(this.p)
  .subscribe(response => {
    console.log('Pack saved successfully:', response);
    this.getAllPacks();
  }, error => {
    console.error('Error saving Pack:', error);
  });
 }
 delete(id:number): void {
  this.packService.DeletePack(id).subscribe(
    response => {
      console.log('Forum deleted successfully:', response);
      // Actualiser la liste des forums après la suppression
      this.packService.getAllPacks().subscribe(
        Packs => {
          // Mettre à jour la liste des forums dans le composant
          this.Packs = Packs;
        },
        error => {
          console.error('Error refreshing forums:', error);
        }
      );
      // Ajouter une alerte de succès
      this.alerts.push({
        id: this.alerts.length + 1,
        type: 'success',
        strong: 'Success!',
        message: 'Forum deleted successfully',
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
openUpdate(p:Pack ){
  this.open(this.classic1,'modal_mini','sm');
  this.selectedPack=p;
  console.log("pack selectionned:Montant",this.selectedPack.montant,'__description:',this.selectedPack.description)
  
}
selectedPack=new Pack;

updatePack() {   
  this.packService.UpdatePack(this.selectedPack,this.selectedPack.idPack)
  .subscribe(response => {
    console.log('Forum updated successfully:', response);
  }, error => {
    console.error('Error updating forum:', error);
  });
  
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

