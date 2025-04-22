import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { FrontComponent } from './front.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { CondidatureComponent } from './condidature/condidature.component';
import { SponsorDetailsComponent } from './sponsor-details/sponsor-details.component';
import { OffreComponent } from './offre/offre.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { PackComponent } from './pack/pack.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservationComponent } from './reservation/reservation.component';
import { EntrepriseOffersComponent } from './entreprise-offers/entreprise-offers.component';

const routes: Routes = [
  { 
    path: '',
    component: FrontComponent,
    children: [
      { path: 'book',     component: ReservationComponent },
    { path: 'offre',          component: OffreComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'condidature',     component: CondidatureComponent },
    { path: 'sponsor',     component: SponsorComponent },
    { path: 'sponsor/details',     component: SponsorDetailsComponent },
    { path: 'annonce',     component: AnnonceComponent },
    { path: 'reclamation',     component: ReclamationComponent },
    { path: 'pack',     component: PackComponent },
    { path: 'sponsor', component: SponsorComponent },
    { path: 'profile',     component: ProfileComponent },
    { path: 'espaceEntreprise',     component: EntrepriseOffersComponent },



    { path: '', redirectTo: 'landing', pathMatch: 'full' },

      // Ajoutez d'autres routes pour les différentes parties du dashboard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
