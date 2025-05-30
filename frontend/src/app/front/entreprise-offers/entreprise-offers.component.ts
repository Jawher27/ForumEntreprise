import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Offre, TypeOffre} from 'src/app/core/models/Offre';
import {User} from 'src/app/core/models/user';
import {AuthService} from 'src/app/core/services/auth.service';
import {OfferService} from 'src/app/core/services/offer.service';
import {Condidature, EtatCondidature} from '../../core/models/condidature';
import {CondidatureService} from '../../core/services/condidature.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {CandidatureStateService} from '../../core/services/candidature-state.service';

export interface IAlert {
    id: number;
    type: string;
    strong?: string;
    message: string;
    icon?: string;
}

export interface StateOption {
    value: EtatCondidature;
    displayName: string;
    selectable: boolean;
    cssClass: string;
}

@Component({
    selector: 'app-entreprise-offers',
    templateUrl: './entreprise-offers.component.html',
    styleUrls: ['./entreprise-offers.component.css'],
    providers: [OfferService]
})
export class EntrepriseOffersComponent implements OnInit {
    public alerts: Array<IAlert> = [];
    closeResult: string;
    @ViewChild('offerModal') offerModal: any;
    @ViewChild('detailsModal') detailsModal: any;
    selectedOffre: Offre = new Offre();
    candidatures: Condidature[] = [];
    o: Offre = new Offre();
    // o: Offre = {
    //     idOffre: 0,
    //     titre: '',
    //     description: '',
    //     typeOffre: null,
    //     periode: '',
    //     dateDebut: null,
    //     dateFin: null,
    //     dateCreation: null,
    //     lieu: '',
    //     user: null
    // };

    offers: Offre[] = [];
    currentUser: User;
    // cvUrl: SafeResourceUrl | null = null;
    // coverLetterUrl: SafeResourceUrl | null = null;
    documentUrls: Map<number, { cvUrl?: SafeResourceUrl, coverLetterUrl?: SafeResourceUrl }> = new Map();
    showCv = false;
    showCoverLetter = false;
    selectedCandidature: Condidature | null = null;
    applicationStates = Object.values(EtatCondidature);
    EtatCondidature = EtatCondidature;

// Map pour stocker les états disponibles pour chaque candidature
    candidatureStateOptions: Map<number, StateOption[]> = new Map();

    typeOptions = [
        { value: TypeOffre.STAGE_PFE_INGENIEUR, label: 'Stage PFE Ingénieur', duration: 6 },
        { value: TypeOffre.STAGE_PFE_LICENCE, label: 'Stage PFE Licence', duration: 4 },
        { value: TypeOffre.OFFRE_ETE, label: 'Stage Été', duration: 2 },
    ];

    constructor(private offreService: OfferService, private router: Router, private modalService: NgbModal, private authService: AuthService,
                private condidatureService: CondidatureService,
                private sanitizer: DomSanitizer, private candidatureStateService: CandidatureStateService) {
    }

    ngOnInit(): void {
        /********Get the user connected*********/
        this.authService.CurrentUser().subscribe(
            (user: User) => {
                this.currentUser = user;
                this.getOffersByUserId(this.currentUser.id);

                console.log('Utilisateur connecté : ', this.currentUser);
            },
            (error) => {
                console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
            }
        );
        /***********************************/

    }


    onTypeChange(): void {
        const selected = this.typeOptions.find(opt => opt.value === this.o.typeOffre);
        if (selected) {
            this.o.periode = `${selected.duration} mois`;
            this.calculateDateFin(selected.duration);
        }
    }

    onDateDebutChange(): void {
        const selected = this.typeOptions.find(opt => opt.value === this.o.typeOffre);
        if (selected) {
            this.calculateDateFin(selected.duration);
        }
    }

    calculateDateFin(months: number): void {
        if (!this.o.dateDebut) return;
        const debut = new Date(this.o.dateDebut);
        const fin = new Date(debut);
        fin.setMonth(fin.getMonth() + months);
        this.o.dateFin = fin;
    }

    /**
     * Génère les options d'état disponibles pour une candidature
     */
    getStateOptionsForCandidature(candidature: Condidature): StateOption[] {
        // Si nous avons déjà calculé les options pour cette candidature et cet état, retourner le cache
        const cacheKey = candidature.idCondidature;

        if (this.candidatureStateOptions.has(cacheKey)) {
            return this.candidatureStateOptions.get(cacheKey);
        }

        // Sinon, calculer les options disponibles
        const currentState = candidature.etatCondidature;
        const availableStates = this.candidatureStateService.getAvailableStates(currentState);

        const options: StateOption[] = availableStates.map(stateObj => {
            return {
                value: stateObj.state,
                displayName: this.getStatusDisplayName(stateObj.state),
                selectable: stateObj.selectable,
                cssClass: this.getStateCssClass(stateObj.state)
            };
        });

        // Mettre en cache les options pour cette candidature
        this.candidatureStateOptions.set(cacheKey, options);

        return options;
    }

    /**
     * Retourne la classe CSS pour un état donné
     */
    getStateCssClass(state: EtatCondidature): string {
        switch (state) {
            case EtatCondidature.Submitted:
                return 'state-submitted';
            case EtatCondidature.Pending:
                return 'state-pending';
            case EtatCondidature.AcceptedForFirstInterview:
                return 'state-accepted-first';
            case EtatCondidature.AcceptedForSecondInterview:
                return 'state-accepted-second';
            case EtatCondidature.WelcomeToTheTeam:
                return 'state-welcome';
            case EtatCondidature.NotAccepted:
                return 'state-not-accepted';
            default:
                return '';
        }
    }

    /**
     * Vérifie si un état est sélectionnable pour une candidature
     */
    isStateSelectable(candidature: Condidature, state: EtatCondidature): boolean {
        const options = this.getStateOptionsForCandidature(candidature);
        const option = options.find(opt => opt.value === state);
        return option ? option.selectable : false;
    }

    /**
     * Gère le changement d'état d'une candidature
     */
    onStateChange(candidature: Condidature, newState: EtatCondidature): void {
        // Vérifier si le changement d'état est valide
        if (!this.candidatureStateService.isValidStateTransition(candidature.etatCondidature, newState)) {
            // Annuler le changement et restaurer l'état précédent
            console.warn('Transition d\'état invalide:', candidature.etatCondidature, '->', newState);
            return;
        }

        // Mettre à jour l'état de la candidature
        const previousState = candidature.etatCondidature;
        candidature.etatCondidature = newState;

        // Mettre à jour le cache des options d'état
        this.candidatureStateOptions.delete(candidature.idCondidature);

        // Sauvegarder le changement d'état
        this.updateCandidatureStatus(candidature, newState);

        // Si l'état final est atteint (WelcomeToTheTeam ou NotAccepted), fermer le sélecteur
        if (newState === EtatCondidature.WelcomeToTheTeam || newState === EtatCondidature.NotAccepted) {
            // Rien de plus à faire ici car le sélecteur est déjà mis à jour
        }
    }


    ///////////// ADD OFFER /////////////
    onSubmitForm(): void {
        this.o.dateCreation = new Date();
        console.log(this.o);
        if (!this.o.idOffre) {
            this.offreService.addOffer(this.o, this.currentUser.id)
                .subscribe(response => {
                    console.log('Offer saved successfully:', response);
                    this.getOffersByUserId(this.currentUser.id);
                    this.offerModal.reset();
                    this.modalService.dismissAll(this.offerModal);
                }, error => {
                    console.error('Error saving offer:', error);
                });

        } else {
            this.offreService.updateOffre(this.o)
                .subscribe(response => {
                    console.log('Offer updated successfully:', response);
                    this.getOffersByUserId(this.currentUser.id);
                    this.modalService.dismissAll(this.offerModal);
                }, error => {
                    console.error('Error updating offer:', error);
                });
        }

    }

    openOfferModal() {
        this.modalService.open(this.offerModal);
        this.resetForm();
    }
    resetForm(){
        this.offerModal.reset();

    }


    ///////////// GET OFFERS /////////////
    getOffersByUserId(id: number): void {
        this.offreService.getOffersByUserId(id).subscribe(
            (data) => {
                this.offers = data;
            },
            (error) => {
                console.error('Error fetching offers by user ID:', error);
            }
        );
    }

    ///////////////////////////////////////
    getOfferTypeDisplayName(type: string): string {
        switch (type) {
            case 'STAGE_PFE_INGENIEUR':
                return 'Stage PFE Ingenieur';
            case 'STAGE_PFE_LICENCE':
                return 'Stage PFE Licence';
            case 'STAGE_ETE':
                return 'Stage ETE';
            default:
                return type;
        }
    }

///////////// UPDATE OFFER /////////////

    openUpdate(offreToUpdate: Offre) {
        this.o = offreToUpdate;
        this.openOfferModal();

    }

    getStatusDisplayName(status: EtatCondidature): string {
        switch (status) {
            case EtatCondidature.Submitted:
                return 'Submitted';
            case EtatCondidature.Pending:
                return 'Pending';
            case EtatCondidature.AcceptedForFirstInterview:
                return 'AcceptedForFirstInterview';
            case EtatCondidature.AcceptedForSecondInterview:
                return 'AcceptedForSecondInterview';
            case EtatCondidature.WelcomeToTheTeam:
                return '.WelcomeToTheTeam';
            case EtatCondidature.NotAccepted:
                return 'NotAccepted';
            default:
                return status;
        }
    }

    // updateCandidatureStatus(candidature: Condidature, newStatus: EtatCondidature): void {
    //   // Store the current status in case we need to revert
    //   const previousStatus = candidature.etatCondidature;
    //
    //   // Update the UI immediately for better user experience
    //   candidature.etatCondidature = newStatus;
    //
    //   // Réinitialiser les options d'état pour cette candidature
    //   this.candidatureStateOptions.delete(candidature.idCondidature);
    //
    //   // Force la détection des changements tout de suite
    //   this.cdr.detectChanges();
    //
    //   // Créer une copie de la candidature avec le statut mis à jour
    //   const updatedCandidature = { ...candidature, etatCondidature: newStatus };
    //
    //   // Appeler le service pour mettre à jour le statut
    //   this.condidatureService.updateEtatCondidature(candidature.idCondidature, updatedCandidature)
    //       .subscribe({
    //         next: (response) => {
    //           console.log('Statut mis à jour avec succès:', response);
    //
    //           // Mise à jour de la candidature dans le tableau si nécessaire
    //           const index = this.candidatures.findIndex(c => c.idCondidature === candidature.idCondidature);
    //           if (index !== -1) {
    //             // Créer une nouvelle référence pour la candidature
    //             this.candidatures[index] = { ...response };
    //             // Créer une nouvelle référence pour le tableau
    //             this.candidatures = [...this.candidatures];
    //           }
    //
    //           // Force une nouvelle détection des changements
    //           this.cdr.detectChanges();
    //
    //           // Ajouter une alerte de succès
    //           this.alerts.push({
    //             id: this.alerts.length + 1,
    //             type: 'success',
    //             strong: 'Succès!',
    //             message: 'Statut mis à jour avec succès',
    //             icon: 'ni ni-like-2'
    //           });
    //         },
    //         error: (error) => {
    //           console.error('Erreur lors de la mise à jour du statut:', error);
    //
    //           // Revert back to the previous state on error
    //           candidature.etatCondidature = previousStatus;
    //
    //           // Reset state options
    //           this.candidatureStateOptions.delete(candidature.idCondidature);
    //
    //           // Force détection des changements après reversion
    //           this.cdr.detectChanges();
    //
    //           // Ajouter une alerte d'erreur
    //           this.alerts.push({
    //             id: this.alerts.length + 1,
    //             type: 'danger',
    //             strong: 'Erreur!',
    //             message: 'Échec de la mise à jour du statut: ' + error.message,
    //             icon: 'ni ni-bell-55'
    //           });
    //         }
    //       });
    // }

    updateCandidatureStatus(candidature: Condidature, newStatus: EtatCondidature): void {
        // Créer une copie de la candidature avec le statut mis à jour
        const updatedCandidature = {...candidature, etatCondidature: newStatus};

        // Appeler le service pour mettre à jour le statut
        this.condidatureService.updateEtatCondidature(candidature.idCondidature, updatedCandidature)
            .subscribe({
                next: (response) => {
                    console.log('Statut mis à jour avec succès:', response);
                    // Mettre à jour l'objet candidature local pour refléter le changement
                    candidature.etatCondidature = newStatus;

                    // Réinitialiser les options d'état pour cette candidature
                    this.candidatureStateOptions.delete(candidature.idCondidature);
                    // Ajouter une alerte de succès
                    this.alerts.push({
                        id: this.alerts.length + 1,
                        type: 'success',
                        strong: 'Succès!',
                        message: 'Statut mis à jour avec succès',
                        icon: 'ni ni-like-2'
                    });
                },
                error: (error) => {
                    console.error('Erreur lors de la mise à jour du statut:', error);
                    // Ajouter une alerte d'erreur
                    this.alerts.push({
                        id: this.alerts.length + 1,
                        type: 'danger',
                        strong: 'Erreur!',
                        message: 'Échec de la mise à jour du statut: ' + error.message,
                        icon: 'ni ni-bell-55'
                    });
                }
            });
    }


    ///////////// DELETE OFFER /////////////

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

/// ************ LOAD MORE & SHOW LESS **************** ////
    displayedOffers: number = 3;

    loadMoreOffers(): void {
        if (this.offers) {
            this.displayedOffers += 3;
        }
    }

    showLessOffers(): void {
        // Ensure the displayedOffers never go below 3
        if (this.offers) {
            // Ensure the displayedOffers never go below 3
            this.displayedOffers = Math.max(this.displayedOffers - 3, 3);
        }
    }

    openDetailsModal(offre: Offre) {
        this.selectedOffre = offre;
        this.getCondidaturesByOffre(offre.idOffre);
        this.modalService.open(this.detailsModal, {size: 'lg'});
    }

    getCondidaturesByOffre(idOffre: number): void {
        this.condidatureService.getCondidaturesByOffre(idOffre).subscribe(
            (data) => {
                this.candidatures = data;
                console.log('Candidatures récupérées:', this.candidatures);

                // Initialiser les options d'état pour chaque candidature
                this.candidatures.forEach(candidature => {
                    this.candidatureStateOptions.delete(candidature.idCondidature);
                    this.getStateOptionsForCandidature(candidature);
                });
            },
            (error) => {
                console.error('Erreur lors de la récupération des candidatures:', error);
                this.alerts.push({
                    id: this.alerts.length + 1,
                    type: 'warning',
                    strong: 'Attention!',
                    message: 'Erreur lors de la récupération des candidatures: ' + error.message,
                    icon: 'ni ni-bell-55'
                });
            }
        );
    }

//   viewCV(candidature: Condidature): void {
//     this.selectedCandidature = candidature;
//     if (candidature.idCondidature && !this.cvUrl) {
//       this.condidatureService.downloadCV(candidature.idCondidature).subscribe({
//         next: (blob) => {
//           const pdfBlob = new Blob([blob], { type: 'application/pdf' });
//           const objectUrl = URL.createObjectURL(pdfBlob);
//           this.cvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
//           this.showCv = true;
//           this.showCoverLetter = false;
//         },
//         error: (error) => {
//           console.error('Erreur lors du chargement du CV:', error);
//           this.alerts.push({
//             id: this.alerts.length + 1,
//             type: 'warning',
//             strong: 'Erreur!',
//             message: 'Impossible de charger le CV',
//             icon: 'ni ni-bell-55'
//           });
//         }
//       });
//     } else {
//       // Si le CV est déjà chargé, on affiche juste le PDF
//       this.showCv = true;
//       this.showCoverLetter = false;
//     }
//   }
//
//   viewCoverLetter(candidature: Condidature): void {
//     this.selectedCandidature = candidature;
//     if (candidature.idCondidature && !this.coverLetterUrl) {
//       this.condidatureService.downloadCoverLetter(candidature.idCondidature).subscribe({
//         next: (blob) => {
//           const pdfBlob = new Blob([blob], { type: 'application/pdf' });
//           const objectUrl = URL.createObjectURL(pdfBlob);
//           this.coverLetterUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
//           this.showCoverLetter = true;
//           this.showCv = false;
//         },
//         error: (error) => {
//           console.error('Erreur lors du chargement de la lettre de motivation:', error);
//           this.alerts.push({
//             id: this.alerts.length + 1,
//             type: 'warning',
//             strong: 'Erreur!',
//             message: 'Impossible de charger la lettre de motivation',
//             icon: 'ni ni-bell-55'
//           });
//         }
//       });
//     } else {
//       // Si la lettre est déjà chargée, on affiche juste le PDF
//       this.showCoverLetter = true;
//       this.showCv = false;
//     }
//   }
//
//   closeViewer(): void {
//     this.showCv = false;
//     this.showCoverLetter = false;
//   }
//
// // Nettoyer les URL lorsque le composant est détruit
//   ngOnDestroy(): void {
//     if (this.cvUrl) {
//       URL.revokeObjectURL(this.cvUrl.toString());
//     }
//     if (this.coverLetterUrl) {
//       URL.revokeObjectURL(this.coverLetterUrl.toString());
//     }
//   }

    viewCV(candidature: Condidature): void {
        this.selectedCandidature = candidature;
        if (!candidature.idCondidature) {
            return;
        }

        const candidatureId = candidature.idCondidature;

        // Si cette candidature n'a pas encore d'entrée dans la Map, on en crée une
        if (!this.documentUrls.has(candidatureId)) {
            this.documentUrls.set(candidatureId, {});
        }

        // Récupère l'objet contenant les URLs pour cette candidature
        const documentInfo = this.documentUrls.get(candidatureId);

        // Si le CV pour cette candidature n'a pas encore été chargé
        if (!documentInfo.cvUrl) {
            this.condidatureService.downloadCV(candidatureId).subscribe({
                next: (blob) => {
                    const pdfBlob = new Blob([blob], {type: 'application/pdf'});
                    const objectUrl = URL.createObjectURL(pdfBlob);
                    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);

                    // Met à jour l'URL dans la Map
                    this.documentUrls.set(candidatureId, {
                        ...documentInfo,
                        cvUrl: safeUrl
                    });

                    this.showCv = true;
                    this.showCoverLetter = false;
                },
                error: (error) => {
                    console.error('Erreur lors du chargement du CV:', error);
                    this.alerts.push({
                        id: this.alerts.length + 1,
                        type: 'warning',
                        strong: 'Erreur!',
                        message: 'Impossible de charger le CV',
                        icon: 'ni ni-bell-55'
                    });
                }
            });
        } else {
            // Si le CV a déjà été chargé, on l'affiche simplement
            this.showCv = true;
            this.showCoverLetter = false;
        }
    }

// Méthode mise à jour pour visualiser les lettres de motivation
    viewCoverLetter(candidature: Condidature): void {
        this.selectedCandidature = candidature;
        if (!candidature.idCondidature) {
            return;
        }

        const candidatureId = candidature.idCondidature;

        // Si cette candidature n'a pas encore d'entrée dans la Map, on en crée une
        if (!this.documentUrls.has(candidatureId)) {
            this.documentUrls.set(candidatureId, {});
        }

        // Récupère l'objet contenant les URLs pour cette candidature
        const documentInfo = this.documentUrls.get(candidatureId);

        // Si la lettre de motivation pour cette candidature n'a pas encore été chargée
        if (!documentInfo.coverLetterUrl) {
            this.condidatureService.downloadCoverLetter(candidatureId).subscribe({
                next: (blob) => {
                    const pdfBlob = new Blob([blob], {type: 'application/pdf'});
                    const objectUrl = URL.createObjectURL(pdfBlob);
                    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);

                    // Met à jour l'URL dans la Map
                    this.documentUrls.set(candidatureId, {
                        ...documentInfo,
                        coverLetterUrl: safeUrl
                    });

                    this.showCoverLetter = true;
                    this.showCv = false;
                },
                error: (error) => {
                    console.error('Erreur lors du chargement de la lettre de motivation:', error);
                    this.alerts.push({
                        id: this.alerts.length + 1,
                        type: 'warning',
                        strong: 'Erreur!',
                        message: 'Impossible de charger la lettre de motivation',
                        icon: 'ni ni-bell-55'
                    });
                }
            });
        } else {
            // Si la lettre a déjà été chargée, on l'affiche simplement
            this.showCoverLetter = true;
            this.showCv = false;
        }
    }

    closeViewer(): void {
        this.showCv = false;
        this.showCoverLetter = false;
    }

// Nettoyer les URL lorsque le composant est détruit
    ngOnDestroy(): void {
        // Parcourir toutes les entrées de la Map et libérer les URLs
        this.documentUrls.forEach((documentInfo) => {
            if (documentInfo.cvUrl) {
                URL.revokeObjectURL(documentInfo.cvUrl.toString());
            }
            if (documentInfo.coverLetterUrl) {
                URL.revokeObjectURL(documentInfo.coverLetterUrl.toString());
            }
        });
    }
}
