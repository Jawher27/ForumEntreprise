import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Forum } from 'src/app/core/models/Forum';
import { ForumService } from 'src/app/core/services/forum.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';

export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}
@Component({
  selector: 'app-forum-management',
  templateUrl: './forum-management.component.html', 
  styleUrls: ['./forum-management.component.css'],
  providers:[ForumService]
})
export class ForumManagementComponent implements OnInit {
  closeResult: string;
  @ViewChild('classic1') classic1: any;
  @ViewChild('classic2') classic2: any;

  public alerts: Array<IAlert> = [];

  focus:any;
  focus1:any;
  forums:Forum[]
  f:Forum=new Forum();

  constructor(private modalService: NgbModal,private forumService:ForumService) {
   
   }
  ngOnInit(): void {
    this.getAllForums();
  }
  private getAllForums(){
    this.forumService.getAllForoms().subscribe(data =>{
         this.forums = data ;
     });
 }
 onSubmitForm(): void{
 
console.log(this.f);
this.f.hour += ":00";
console.log(this.f);

  this.forumService.SaveForum(this.f)
  .subscribe(response => {
    console.log('Forum saved successfully:', response);
    this.getAllForums();
  }, error => {
    console.error('Error saving forum:', error);
  });

 }
 delete(id:number): void {
  this.forumService.DeleteForum(id).subscribe(
    response => {
      console.log('Forum deleted successfully:', response);
      // Actualiser la liste des forums après la suppression
      this.forumService.getAllForoms().subscribe(
        forums => {
          // Mettre à jour la liste des forums dans le composant
          this.forums = forums;
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
// Propriété pour stocker les détails du forum sélectionné pour la mise à jour
selectedForum: Forum = {
  idForum: null,
  dateForum: '',
  hour: '',
  description: '',
  bloc: '',
  user:null,
};
openUpdate(id: number) {
  // Copiez les détails du forum sélectionné dans selectedForum
  const forumToUpdate = this.forums.find(forum => forum.idForum === id);
  if (forumToUpdate) {
    console.log(forumToUpdate);
    this.selectedForum = forumToUpdate;
  }
 // Affichez le formulaire de mise à jour après avoir rempli les détails
 this.open(this.classic1, 'modal_mini', 'sm');
}


updateForum() {   
  this.selectedForum.hour += ":00";

  this.forumService.UpdateForum(this.selectedForum,this.selectedForum.idForum)
  .subscribe(response => {
    console.log('Forum updated successfully:', response);
  }, error => {
    console.error('Error updating forum:', error);
  });
  
}
openAdd(){
  this.open(this.classic2, 'modal_mini', 'sm');
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
