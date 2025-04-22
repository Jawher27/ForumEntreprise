import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FrontRoutingModule } from './front-routing.module';
import { FrontComponent } from './front.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { OffreComponent } from './offre/offre.component';
import { CondidatureComponent } from './condidature/condidature.component';
import { SponsorDetailsComponent } from './sponsor-details/sponsor-details.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { PackComponent } from './pack/pack.component';
import { ForumComponent } from './forum/forum.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ReservationComponent } from './reservation/reservation.component';
import { MesResComponent } from './mes-res/mes-res.component';
import { DetailleOffreComponent } from './detaille-offre/detaille-offre.component';
import { EntrepriseOffersComponent } from './entreprise-offers/entreprise-offers.component';
import { MesCondComponent } from './mes-cond/mes-cond.component';

@NgModule({
  declarations: [
    FrontComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    SponsorComponent,
    OffreComponent,
    CondidatureComponent,
    SponsorDetailsComponent,
    AnnonceComponent,
    ReclamationComponent,
    PackComponent,
    ForumComponent,
    ProfileComponent,
    ReservationComponent,
    MesResComponent,
    DetailleOffreComponent,
    EntrepriseOffersComponent,
    MesCondComponent,
  ],
    imports: [
        CommonModule,
        FrontRoutingModule,
        NgbModule,
        FormsModule,
        NgxQRCodeModule,
        ReactiveFormsModule
    ]
})
export class FrontModule { }
