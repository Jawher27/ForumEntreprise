import { Component, OnInit } from '@angular/core';
import { Condidature } from 'src/app/core/models/condidature';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { CondidatureService } from 'src/app/core/services/condidature.service';
import {Offre} from '../../core/models/Offre';
import {OfferService} from '../../core/services/offer.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-mes-cond',
  templateUrl: './mes-cond.component.html',
  styleUrls: ['./mes-cond.component.css']
})
export class MesCondComponent implements OnInit {
    isLoading = true;
    errorMessage = '';
    offers: Offre[] = [];
    offresMap: Map<number, Offre> = new Map<number, Offre>(); // Pour stocker les offres par ID

    // Pour le modal de détails
    selectedCandidatureId: number | null = null;
    selectedCandidature: Condidature | null = null;
    detailsLoading = false;
    detailsError = '';

    isModalOpen = false;
    isLoadingDetails = false;
    detailsErrorMessage = '';
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
                this.loadCandidaturesByUser(user.id );
            },
            error: (error) => {
                console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
                this.isLoading = false;
            }
        });
        this.getOffers();
    }


    // ngOnInit(): void {
    //     // Charger les données en parallèle pour optimiser le temps de chargement
    //     this.isLoading = true;
    //     this.errorMessage = '';
    //
    //     this.authService.CurrentUser().subscribe({
    //         next: (user: User) => {
    //             this.currentUser = user;
    //             console.log('Utilisateur connecté : ', this.currentUser);
    //
    //             // Une fois l'utilisateur chargé, chargez les offres et les candidatures en parallèle
    //             forkJoin({
    //                 offers: this.offerService.getAllOffers(),
    //                 candidatures: this.condidatureService.getCandidaturesByUserId(user.id)
    //             }).subscribe({
    //                 next: (results) => {
    //                     this.offers = results.offers;
    //                     this.con = results.candidatures;
    //
    //                     // Créer une map pour un accès rapide aux offres par ID
    //                     this.offers.forEach(offre => {
    //                         this.offresMap.set(offre.idOffre, offre);
    //                     });
    //
    //                     // Enrichir les candidatures avec les détails complets des offres si nécessaire
    //                     this.enrichCandidaturesWithOffers();
    //
    //                     this.isLoading = false;
    //                     console.log("Candidatures de l'utilisateur:", this.con);
    //                     console.log("Offres chargées:", this.offers);
    //                 },
    //                 error: (error) => {
    //                     this.errorMessage = 'Erreur lors du chargement des données';
    //                     console.error("Error fetching data:", error);
    //                     this.isLoading = false;
    //                 }
    //             });
    //         },
    //         error: (error) => {
    //             console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
    //             this.isLoading = false;
    //             this.errorMessage = 'Erreur lors de la récupération des informations de l\'utilisateur';
    //         }
    //     });
    // }
    // Méthode pour enrichir les candidatures avec toutes les informations d'offres
    // enrichCandidaturesWithOffers(): void {
    //     this.con.forEach(candidature => {
    //         // Si la candidature a un ID d'offre mais pas toutes les infos de l'offre
    //         if (candidature.offre && candidature.offre.idOffre && this.offresMap.has(candidature.offre.idOffre)) {
    //             // Récupérer l'offre complète à partir de la map
    //             const offreComplete = this.offresMap.get(candidature.offre.idOffre);
    //             // Mettre à jour l'offre dans la candidature avec toutes les informations
    //             candidature.offre = offreComplete;
    //         }
    //     });
    // }
    // Méthode pour filtrer les candidatures par offre dans l'interface utilisateur
    // filterByOffre(offreId: number | null): void {
    //     if (!offreId) {
    //         // Si aucun filtre, charger toutes les candidatures de l'utilisateur
    //         this.loadCandidaturesByUser(this.currentUser.id);
    //     } else {
    //         // Filtrer les candidatures déjà chargées
    //         this.isLoading = true;
    //         this.condidatureService.getCandidaturesByUserId(this.currentUser.id).subscribe({
    //             next: (allCandidatures) => {
    //                 // Filtrer côté client
    //                 this.con = allCandidatures.filter(c => c.offre && c.offre.idOffre === offreId);
    //                 this.enrichCandidaturesWithOffers(); // S'assurer que les détails d'offres sont complets
    //                 this.isLoading = false;
    //             },
    //             error: (error) => {
    //                 this.errorMessage = 'Erreur lors du filtrage des candidatures';
    //                 console.error("Error filtering candidatures:", error);
    //                 this.isLoading = false;
    //             }
    //         });
    //     }
    // }

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

    openDetailModal(candidatureId: number): void {
        this.selectedCandidatureId = candidatureId;
        this.isModalOpen = true;
        this.loadCandidatureDetails(candidatureId);
    }

    closeDetailModal(): void {
        this.isModalOpen = false;
        this.selectedCandidatureId = null;
        this.showCv = false;
        this.showCoverLetter = false;
    }
    loadCandidatureDetails(id: number): void {
        this.isLoadingDetails = true;
        this.detailsErrorMessage = '';
        this.condidatureService.getCandidature(id).subscribe({
            next: (data) => {
                this.selectedCandidature = data;
                this.isLoadingDetails = false;
            },
            error: (error) => {
                this.detailsErrorMessage = 'Impossible de charger les détails de la candidature';
                this.isLoadingDetails = false;
            }
        });
    }

    viewCV(): void {
        if (this.selectedCandidature?.idCondidature && !this.cvUrl) {
            this.condidatureService.downloadCV(this.selectedCandidature.idCondidature).subscribe({
                next: (blob) => {
                    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
                    const objectUrl = URL.createObjectURL(pdfBlob);
                    this.cvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
                    this.showCv = true;
                    this.showCoverLetter = false;
                },
                error: (error) => {
                    this.detailsErrorMessage = 'Erreur lors du chargement du CV';
                }
            });
        } else {
            // Si le CV est déjà chargé, on affiche juste le PDF
            this.showCv = true;
            this.showCoverLetter = false;
        }
    }

    viewCoverLetter(): void {
        if (this.selectedCandidature?.idCondidature && !this.coverLetterUrl) {
            this.condidatureService.downloadCoverLetter(this.selectedCandidature.idCondidature).subscribe({
                next: (blob) => {
                    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
                    const objectUrl = URL.createObjectURL(pdfBlob);
                    this.coverLetterUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
                    this.showCoverLetter = true;
                    this.showCv = false;
                },
                error: (error) => {
                    this.detailsErrorMessage = 'Erreur lors du chargement de la lettre de motivation';
                }
            });
        } else {
            // Si la lettre est déjà chargée, on affiche juste le PDF
            this.showCoverLetter = true;
            this.showCv = false;
        }
    }




    closeViewer(): void {
        this.showCv = false;
        this.showCoverLetter = false;
    }

// Ajoutez cette méthode à ngOnDestroy() si elle existe déjà, sinon créez-la
    ngOnDestroy(): void {
        // Votre code existant de ngOnDestroy s'il y en a...

        // Nettoyage des URL
        if (this.cvUrl) {
            URL.revokeObjectURL(this.cvUrl.toString());
        }
        if (this.coverLetterUrl) {
            URL.revokeObjectURL(this.coverLetterUrl.toString());
        }
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
    // Ajoutez cette méthode à votre classe
    printCandidatureDetails(): void {
        if (!this.selectedCandidature) return;

        // Créer le contenu HTML à imprimer
        const printContent = `
    <html>
      <head>
        <title>Détails de la candidature</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #eee;
          }
          .info-row {
            display: flex;
            margin-bottom: 8px;
          }
          .info-label {
            font-weight: bold;
            width: 150px;
          }
          .info-value {
            flex: 1;
          }
          .entretien {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #eee;
          }
          @media print {
            body {
              padding: 0;
              margin: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>Détails de la candidature</h2>
          <p>Référence: ${this.selectedCandidature.refCondidature || 'Non disponible'}</p>
          <p>État: ${this.selectedCandidature.etatCondidature || 'Non disponible'}</p>
        </div>
        
        <div class="section">
          <div class="section-title">Informations de l'offre</div>
          <div class="info-row">
            <div class="info-label">Titre:</div>
            <div class="info-value">${this.selectedCandidature.offre?.titre || 'Non disponible'}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Description:</div>
            <div class="info-value">${this.selectedCandidature.offre?.description || 'Non disponible'}</div>
          </div>
        </div>
        
        ${this.selectedCandidature.entretien ? `
        <div class="section">
          <div class="section-title">Entretien planifié</div>
          <div class="entretien">
            <div class="info-row">
              <div class="info-label">Date:</div>
              <div class="info-value">${new Date(this.selectedCandidature.entretien.date).toLocaleString()}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Lieu:</div>
              <div class="info-value">${this.selectedCandidature.entretien.room || 'Non spécifié'}</div>
            </div>
          </div>
        </div>
        ` : ''}
        
        <div class="section no-print">
          <p><em>Document généré le ${new Date().toLocaleString()}</em></p>
        </div>
      </body>
    </html>
  `;

        // Ouvrir une nouvelle fenêtre pour l'impression
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(printContent);
        printWindow.document.close();

        // Attendre que le contenu soit chargé avant d'imprimer
        printWindow.onload = function() {
            printWindow.print();
            // Optionnel: fermer la fenêtre après l'impression
            // printWindow.onafterprint = function() {
            //   printWindow.close();
            // };
        };
    }

}
