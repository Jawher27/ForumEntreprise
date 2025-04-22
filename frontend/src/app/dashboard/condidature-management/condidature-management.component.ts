import { Component, OnInit, ViewChild } from '@angular/core';
import { Entretien } from 'src/app/core/models/Entretien';
import { Condidature, EtatCondidature } from 'src/app/core/models/condidature';
import { CondidatureService } from 'src/app/core/services/condidature.service';
import { EntretienService } from 'src/app/core/services/entretien.service';
import { IAlert } from 'src/app/sections/alerts-section/alerts-section.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-condidature-management',
  templateUrl: './condidature-management.component.html',
  styleUrls: ['./condidature-management.component.css']
})
export class CondidatureManagementComponent implements OnInit {
  
  con: Condidature[]; 
  en: Entretien[]  ; 
  closeResult: string;
  @ViewChild('entretienModal') entretienModal: any;
  @ViewChild('UpdateEntertiennModal') UpdateEntertiennModal: any;

  public alerts: Array<IAlert> = [];
  focus: any;
  focus1: any;
  entretiens: Entretien[]=[]; 
  e: Entretien = new Entretien();
  entre:Entretien={
    idEntretien:null,

  date: '',
  room: '',
  // condidature:Condidature;
 // EtatCondidature:EtatCondidature;
  time: '',
  };

  showEntretienModal: boolean = false;

  constructor(
    private condidatureService: CondidatureService,
    private entretienService: EntretienService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllCondidatures(); 
    this.getAllEntretiens(); 
   
  }   

  


  getAllCondidatures() {
    this.condidatureService.getAllCondidatures().subscribe(
      (condidatures: Condidature[]) => {
        this.con = condidatures;
        console.log("Received Condidatures:", this.con);
      },
      error => {
        console.error("Error fetching Condidatures:", error);
      } 
    );
  }

  getAllEntretiens() { 
    this.entretienService.getAllEntretiens().subscribe(
      (entretiens: Entretien[]) => {
        this.en = entretiens;
        console.log("Received Entretiens:", this.en);
      },
      error => {
        console.error("Error fetching Entretiens:", error);
      }  
    );
  } 

  deleteCondidature(idCondidature: number): void { 
    console.log(idCondidature);
    if (idCondidature === undefined || idCondidature === null) {
      console.error('Invalid condidature id:', idCondidature);
      return;
    }
    
    this.condidatureService.deleteCondidature(idCondidature).subscribe(
      () => {
        console.log('Condidature deleted successfully');
        this.getAllCondidatures();
      },
      error => {
        console.error('Error deleting condidature:', error);
      }
    );
  } 

  onSubmitForm(): void {
    // Check if condidature is defined
   this.e.time+=":00";
      // Set the condidature state
      // this.e.condidature.etatCondidature = EtatCondidature.Accepted;
      console.log("fghjhgfhklkjhgfd:",this.e,"\n", this.id,"\n etat :",  EtatCondidature.Waitlisted)
      // Add the entretien
      this.entretienService.addEntretien(this.e, this.id, EtatCondidature.Waitlisted).subscribe(
        response => {
          // Handle success response
          console.log('Entretien added successfully:', response);
          // Show success alert
          
        },
        error => {
          // Handle error response
          console.error('Error adding Entretien:', error);
        }
      );
    
    // Reset the form after submission
  }


  id:number;

  openEntretienModal(idCondidature: number) {
    // Réinitialiser l'objet entretien
    this.e = new Entretien();
    // Définir l'ID de la condidature dans l'entretien
    // this.e.condidature = new Condidature();
    //this.e.condidature.idCondidature = idCondidature;
    this.id=idCondidature;
    // Ouvrir la modal
    this.modalService.open(this.UpdateEntertiennModal);
  }

  updateEntretien(entretien: Entretien): void {
    this.entretienService.updateEntretien(entretien).subscribe(
      updatedEntretien => {
        // Logique à effectuer après la mise à jour de l'entretien
        console.log('Entretien mis à jour avec succès :', updatedEntretien);
      },
      error => {
        // Gestion des erreurs
        console.error('Erreur lors de la mise à jour de l\'entretien :', error);
      }
    );
  } 
  deleteEntretien(idEntretien: number): void {
    // Vérifiez d'abord si l'ID de l'entretien est valide
    if (!idEntretien) {
      console.error('ID d\'entretien invalide :', idEntretien);
      return;
    }
  
    // Appelez la méthode deleteEntretien du service pour supprimer l'entretien
    this.entretienService.deleteEntretien(idEntretien).subscribe(
      () => {
        console.log('Entretien supprimé avec succès');
        // Mettez à jour la liste des entretiens après la suppression
        this.getAllEntretiens();
      },
      error => {
        console.error('Erreur lors de la suppression de l\'entretien :', error);
      }
    );
  }

  ///////// UPDATE ENTRETRIEN ///////////
  openUpdateModal(){
    this.modalService.open(this.UpdateEntertiennModal) ;
  }

  onUpdateForm(): void {
    // Check if condidature is defined
    // if(this.entre.idEntretien){
    //   this.entre.time+=":00";
    //   this.entretienService.updateEntretien(this.entre)
    //   .subscribe(response => {
    //     console.log('entretien updated successfully:', response);
    //     this.modalService.dismissAll(this.UpdateEntertiennModal);
    //     }, error => {
    //     console.error('Error updating entretien:', error);
    //   });
    // }
    this.entre.idEntretien=this.idddddd;
    this.entre.time+=":00";
    // Set the condidature state
    // this.e.condidature.etatCondidature = EtatCondidature.Accepted;
    console.log("fghjhgfhklkjhgfd:",this.entre);
    // Add the entretien
    this.entretienService.updateEntretien(this.entre).subscribe(
      response => {
        // Handle success response
        console.log('Entretien updated successfully:', response);
        // Show success alert
        
      },
      error => {
        // Handle error response
        console.error('Error updating Entretien:', error);
      }
    );
  
   
  }
idddddd:number;
  openUpdate(identretienToUpdate : number)
  {
    this.idddddd=identretienToUpdate;
    const entretienToUpdate=this.en.find(entretien =>{
      entretien.idEntretien===identretienToUpdate
    });
    if(entretienToUpdate){
      console.log("forum to update",entretienToUpdate);
      this.entre=entretienToUpdate;
      console.log("ooooooooooooooo",this.entre);
     // this.entre.idEntretien=identretienToUpdate;
    }
  
  
  
    this.openUpdateModal() ; 
}

}
