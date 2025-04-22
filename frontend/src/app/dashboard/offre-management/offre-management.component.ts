import { Component, OnInit , ViewChild} from '@angular/core';
import { Offre } from 'src/app/core/models/Offre';
import { OfferService } from 'src/app/core/services/offer.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Review } from 'src/app/core/models/Review';
import { ReviewService } from 'src/app/core/services/review.service';

export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}

@Component({
  selector: 'app-offre-management',
  templateUrl: './offre-management.component.html',
  styleUrls: ['./offre-management.component.css'] ,
  providers:[OfferService]

})

export class OffreManagementComponent implements OnInit {
  closeResult: string;
  @ViewChild('offerModal') offerModal: any;

  public alerts: Array<IAlert> = [];
  focus:any;
  focus1:any;
  offers:Offre[]
  o:Offre=new Offre();
  reviews:Review[] ; 

  constructor(private offreService: OfferService , private reviewService : ReviewService ,private router: Router ,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllOffers();
    this.getAllReviews() ;
  }
  getAllOffers(): void {
    this.offreService.getAllOffers().subscribe(data => {
      this.offers = data.sort((a, b) => a.idOffre - b.idOffre);
    });
  }
  getAllReviews(): void {
    this.reviewService.getAllReviews().subscribe(data => {
      this.reviews = data.sort((a, b) => a.idReview - b.idReview);
      console.log("les data :", this.reviews);
    });
  }
  updateOffre() {   
  
    this.offreService.updateOffre(this.o)
    .subscribe(response => {
      console.log('offre updated successfully:', response);
    }, error => {
      console.error('Error updating offre:', error);
    });
    
  }
  onSubmitForm(): void {
    console.log(this.o);
    if (!this.o.idOffre) {
        this.offreService.addOffer(this.o, 2)
          .subscribe(response => {
            console.log('Offer saved successfully:', response);
            this.getAllOffers();
            this.modalService.dismissAll(this.offerModal);
          }, error => {
            console.error('Error saving offer:', error);
          });
      
    } 
    else {
      this.offreService.updateOffre(this.o)
  .subscribe(response => {
    console.log('Offer updated successfully:', response);
    this.getAllOffers();
    this.modalService.dismissAll(this.offerModal);
    }, error => {
    console.error('Error updating offer:', error);
  });
    }
  
  }
  
  openOfferModal() {
    this.modalService.open(this.offerModal);
  }
 
    getOfferTypeDisplayName(type: string): string {
      switch (type) {
        case 'STAGE_PFE':
          return 'Stage PFE';
        case 'STAGE_ETE':
          return 'Stage Été';
        case 'OFFRE_EMPLOI':
          return 'Offre d\'emploi';
        default:
          return type;
      }
    }
  
    openUpdate(offreToUpdate: Offre) {
       this.o = offreToUpdate;
         this.openOfferModal();

    }

    delete(id: number): void {
      this.offreService.deletOffre(id).subscribe(
        () => {
          console.log('Offer deleted successfully');
          // Fetch the updated list of offers after deletion
          this.offreService.getAllOffers().subscribe(
            offers => {
              // Update the offers list in the component
              this.offers = offers;
              // Add a success alert
              this.alerts.push({
                id: this.alerts.length + 1,
                type: 'success',
                strong: 'Success!',
                message: 'Offer deleted successfully',
                icon: 'ni ni-like-2'
              });
            },
            error => {
              console.error('Error refreshing offers:', error);
              // Add a warning alert
              this.alerts.push({
                id: this.alerts.length + 1,
                type: 'warning',
                strong: 'Warning!',
                message: 'Error refreshing offers: ' + error.message,
                icon: 'ni ni-bell-55'
              });
            }
          );
        },
        error => {
          console.error('Error deleting offer:', error);
          // Add a warning alert
          this.alerts.push({
            id: this.alerts.length + 1,
            type: 'warning',
            strong: 'Warning!',
            message: 'Error deleting offer: ' + error.message,
            icon: 'ni ni-bell-55'
          });
        }
      );
    }
    

}
