import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import {AuthService} from "../../../core/services/auth.service";
import {User} from "../../../core/models/user";
import {StorageService} from "../../../core/services/storage.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
 //   isUserConnected: boolean = false; // Supposons que l'utilisateur ne soit pas connecté par défaut
    currentUser:User;
    constructor(private storageService:StorageService,public location: Location, private router: Router ,private authService: AuthService) {
    }

    ngOnInit() {

        console.log('Utilisateur connecté : 0000000', this.currentUser);
        this.authService.CurrentUser().subscribe(
           data=>{
                this.currentUser = data;
                console.log('Utilisateur connecté : 111111', this.currentUser);
              },
                (error) => {
                 console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
        }
        );





        this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
    }
    navigateTo(route: string): void {
        this.router.navigateByUrl(route);
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }
    logout() {
        this.authService.signOut().subscribe(
            () => {
                console.log('Déconnexion réussie');
                this.currentUser = null;

                this.router.navigate(['/front/landing']);
                // Ajoutez ici le code pour rediriger l'utilisateur ou effectuer d'autres actions après la déconnexion
            },
            (error) => {
                console.error('Erreur lors de la déconnexion : ', error);
            }
        );
    }

    protected readonly Boolean = Boolean;
}
