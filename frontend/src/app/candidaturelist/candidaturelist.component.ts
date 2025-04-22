import { Component, OnInit } from '@angular/core';
import {Condidature} from '../core/models/condidature';
import {CondidatureService} from '../core/services/condidature.service';
import {AuthService} from '../core/services/auth.service';
import {User} from '../core/models/user';
import {OfferService} from '../core/services/offer.service';
import {Offre} from '../core/models/Offre';

@Component({
  selector: 'app-candidaturelist',
  templateUrl: './candidaturelist.component.html',
  styleUrls: ['./candidaturelist.component.css']
})
export class CandidaturelistComponent implements OnInit {
  candidatures: Condidature[] = [];
  isLoading = true;
  errorMessage = '';
  currentUser: User | undefined;
  offers: Offre[] = [];

  constructor(private candidatureService: CondidatureService
              , private authservice: AuthService , private offerservice: OfferService ) { }

  ngOnInit(): void {
    this.authservice.CurrentUser().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        console.log('Utilisateur connecté : ', this.currentUser);
        this.loadCandidaturesByUser(user.id); // 💡 Appel ici
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
        this.isLoading = false;
      }
    });
    this.getOffers();
  }

  loadCandidaturesByUser(userId: number): void {
    this.isLoading = true;
    this.candidatureService.getCandidaturesByUserId(userId).subscribe({
      next: (data) => {
        this.candidatures = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des candidatures de l\'utilisateur';
        this.isLoading = false;
      }
    });
  }
  getOffers(): void {
    this.isLoading = true;
    this.offerservice.getAllOffers().subscribe({
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

}
