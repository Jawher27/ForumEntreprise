import { Component, OnInit } from '@angular/core';
import { Condidature } from 'src/app/core/models/condidature';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { CondidatureService } from 'src/app/core/services/condidature.service';
import {Offre} from '../../core/models/Offre';
import {OfferService} from '../../core/services/offer.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-mes-cond',
  templateUrl: './mes-cond.component.html',
  styleUrls: ['./mes-cond.component.css']
})
export class MesCondComponent implements OnInit {
    isLoading = true;
    errorMessage = '';
    offers: Offre[] = [];

    // Pour le modal de détails
    selectedCandidature: Condidature | null = null;
    detailsLoading = false;
    detailsError = '';

    // Pour l'affichage des PDFs
    cvUrl: SafeResourceUrl | null = null;
    coverLetterUrl: SafeResourceUrl | null = null;
    showCv = false;
    showCoverLetter = false;

    // Références aux modals
    private detailsModal: any;
    private pdfModal: any;
  constructor(private condidatureService: CondidatureService,private authService:AuthService,private offerService: OfferService,
              private sanitizer: DomSanitizer) { }
  con: Condidature[];
  currentUser:User;

//   ngOnInit(): void {
//     /********Get the user connected*********/
// this.authService.CurrentUser().subscribe(
//   (user: User) => {
//       this.currentUser = user;
//       this.getAllCondidatures();
//
//       console.log('Utilisateur connecté : ', this.currentUser);
//   },
//   (error) => {
//       console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
//   }
// );
// /***********************************/
//   }

    ngOnInit(): void {
        this.authService.CurrentUser().subscribe({
            next: (user: User) => {
                this.currentUser = user;
                console.log('Utilisateur connecté : ', this.currentUser);
                this.loadCandidaturesByUser(user.id);
            },
            error: (error) => {
                console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
                this.isLoading = false;
            }
        });
        this.getOffers();
    }

    // ngAfterViewInit() {
    //     // Initialiser les références des modals une fois que la vue est chargée
    //     this.detailsModal = new bootstrap.Modal(document.getElementById('candidatureDetailsModal'));
    //     this.pdfModal = new bootstrap.Modal(document.getElementById('pdfViewerModal'));
    // }

    loadCandidaturesByUser(userId: number): void {
        this.isLoading = true;
        this.condidatureService.getCandidaturesByUserId(userId).subscribe({
            next: (data) => {
                this.con = data;
                this.isLoading = false;
                console.log("Candidatures de l'utilisateur:", this.con);
            },
            error: (error) => {
                this.errorMessage = 'Erreur lors du chargement des candidatures de l\'utilisateur';
                console.error("Error fetching Condidatures:", error);
                this.isLoading = false;
            }
        });
    }

    getOffers(): void {
        this.isLoading = true;
        this.offerService.getAllOffers().subscribe({
            next: (data: Offre[]) => {
                this.offers = data;
                this.isLoading = false;
            },
            error: (err) => {
                this.errorMessage = 'Erreur lors du chargement des offres';
                console.error(err);
                this.isLoading = false;
            }
        });
    }




  getAllCondidatures() {
    this.condidatureService.getAllCondidatures().subscribe(
      (condidatures: Condidature[]) => {
        // Filtrer les condidatures pour n'afficher que celles du user ayant l'ID égal à 1
        this.con = condidatures.filter(condidature => condidature.user.id === this.currentUser.id);
        console.log("Received Condidatures:", this.con); // Log the received data to the console
      },
      error => {
        console.error("Error fetching Condidatures:", error);
      } 
    ); 
  }
}
