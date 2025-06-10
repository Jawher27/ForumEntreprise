import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './front/signup/signup.component';
import { LoginComponent } from './front/login/login.component';
import { SignupAlumniComponent } from './signup-alumni/signup-alumni.component';
import { RegisterPageComponent } from './front/register-page/register-page.component';
import { SignupClientComponent } from './front/signup-client/signup-client.component';
import {CandidaturelistComponent} from './candidaturelist/candidaturelist.component';
import {CandidaturedetailsComponent} from './candidaturedetails/candidaturedetails.component';

const routes: Routes = [
   { path: 'home',             component: HomeComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule) },
    { path: 'front', loadChildren: () => import('./front/front-routing.module').then(m => m.FrontRoutingModule) },
    { path: 'Student', component: SignupClientComponent},
    { path: 'Student', component: SignupClientComponent},
    { path: 'RegisterPage', component: RegisterPageComponent},
    { path: 'Alumni', component: SignupAlumniComponent},
    {path: 'signup', component: SignupComponent},
    { path: 'candidatures/:id', component: CandidaturedetailsComponent },
    { path: 'listcondidature', component: CandidaturelistComponent},
    { path: '', redirectTo: 'front', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
