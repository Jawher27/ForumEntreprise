  import { Component, OnInit, ViewChild } from '@angular/core';
  import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Announcement } from 'src/app/core/models/Announcment';
  import { TypeAnnonce } from 'src/app/core/models/typeAnnonce';
  import { TypeAnnouncementService } from 'src/app/core/services/type-announcement.service';

  export interface IAlert {
    id: number;
    type: string;
    strong?: string;
    message: string;
    icon?: string;
  }

  @Component({
    selector: 'app-type-announcement',
    templateUrl: './type-announcement.component.html',
    styleUrls: ['./type-announcement.component.css'],
    providers: [TypeAnnouncementService]
  })
  export class TypeAnnouncementComponent implements OnInit {
    levelForm: FormGroup;
    submitted = false;
    closeResult: string;
    @ViewChild('classic1') classic1: any;
    @ViewChild('classic2') classic2: any;

    public alerts: Array<IAlert> = [];

    focus: any;
    focus1: any;
    types: TypeAnnonce[]= []
    typean: TypeAnnonce[]

    f: TypeAnnonce = new TypeAnnonce();

    constructor(private modalService: NgbModal, private typea: TypeAnnouncementService) {}

    ngOnInit(): void {
      this.getAllForums();
    }
    private getAllForums() {
      this.typea.getAllTypes().subscribe(
        data => {
          this.types = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
    }
    isAdding: boolean = false; // Flag to track if the adding form is open

    delete(idType:number): void {
      this.typea.DeleteType(idType).subscribe(
        response => {
          console.log('Forum deleted successfully:', response);
          // Actualiser la liste des forums après la suppression
          this.typea.getAllTypes().subscribe(
            forums => {
              // Mettre à jour la liste des forums dans le composant
              this.types = forums;
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




    selectedTypeAnnouncment: TypeAnnonce = {
      typeId: null,
      libelle: '',
      
      
    };
    openUpdate(typeId: number) {
      // Copiez les détails du forum sélectionné dans selectedForum
      const TypeUpdate = this.typean.find(type => type.typeId === typeId);
      if (TypeUpdate) {
        console.log(TypeUpdate);
        this.selectedTypeAnnouncment = TypeUpdate;
      }
     // Affichez le formulaire de mise à jour après avoir rempli les détails
     this.open(this.classic1, 'modal_mini', 'sm');
    }
    
    
    updateForum() {   
    
      this.typea.UpdateTtpe(this.selectedTypeAnnouncment,this.selectedTypeAnnouncment.typeId)
      .subscribe(response => {
        console.log('Forum updated successfully:', response);
      }, error => {
        console.error('Error updating forum:', error);
      });
      
    }




  openAdd() {
    this.isAdding = true; // Set the flag to true when the adding form is opened
    this.open(this.classic2, 'modal_mini', 'sm');
  }

  onSubmitForm(): void {
    console.log(this.f);

    // Check if the item already exists in the list only when the adding form is open
    if (this.isAdding && this.types.some(type => type.libelle === this.f.libelle)) {
      // If the item already exists, display a message to the user
      this.alerts.push({
        id: this.alerts.length + 1,
        type: 'warning',
        strong: 'Warning!',
        message: 'Type already exists',
        icon: 'ni ni-bell-55'
      });
      // Remove the warning alert after 3 seconds
      setTimeout(() => {
        this.removeAlert(this.alerts.length);
      }, 3000);
      return; // Exit the function without adding the item again
    }

    // If the item does not exist or the form is not open, proceed with adding it
    this.typea.SaveType(this.f)
      .subscribe(response => {
        console.log('Forum saved successfully:', response);
        // Close the modal after saving
        this.modalService.dismissAll(); // Close all modals
        // Refresh the list of types after saving
        this.getAllForums();
        // Add a success alert
        this.alerts.push({
          id: this.alerts.length + 1,
          type: 'success',
          strong: 'Success!',
          message: 'Forum saved successfully',
          icon: 'ni ni-like-2'
        });
        // Remove the success alert after 3 seconds
        setTimeout(() => {
          this.removeAlert(this.alerts.length);
        }, 3000);
      }, error => {
        console.error('Error saving forum:', error);
        // Add a warning alert
        this.alerts.push({
          id: this.alerts.length + 1,
          type: 'warning',
          strong: 'Warning!',
          message: 'Error saving forum: ' + error.message,
          icon: 'ni ni-bell-55'
        });
      });
  }

  // Function to handle modal dismissal
  dismissModal() {
    this.modalService.dismissAll(); // Close all modals
    this.isAdding = false; // Reset the flag when closing the modal
  }

    removeAlert(id: number): void {
      this.alerts = this.alerts.filter(alert => alert.id !== id);
    }
    

 

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
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
        this.modalService.open(content, { centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    }
  }
