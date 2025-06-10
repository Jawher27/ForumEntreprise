import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './front/signup/signup.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './front/login/login.component';
import { AuthService } from './core/services/auth.service';
import { SignupClientComponent } from './front/signup-client/signup-client.component';
import { CandidaturelistComponent } from './candidaturelist/candidaturelist.component';
import { CandidaturedetailsComponent } from './candidaturedetails/candidaturedetails.component';
import { SignupAlumniComponent } from './signup-alumni/signup-alumni.component';
import { FrontModule } from './front/front.module';

@NgModule({
  declarations: [
    AppComponent,
    SignupAlumniComponent,
    CandidaturelistComponent,
    CandidaturedetailsComponent,


  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    NgxQRCodeModule,
    ReactiveFormsModule,
    FrontModule
  ],
  providers: [
    AuthService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
