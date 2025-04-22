import {Component, NgModule, OnInit} from '@angular/core';

import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthService} from "../../core/services/auth.service";
import {StorageService} from "../../core/services/storage.service";
import {User} from "../../core/models/user";
import { Router } from '@angular/router';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ImageService } from 'src/app/core/services/image.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
    user: any;
    content: string;
    qrData: string;

    userRole: string | null = null;
    fileContent:String;

    fileId:string;

  firstName:string ;

    message: string;

    selectedFiles?: FileList;

    currentFile?: File;

    progress = 0;

    fileInfos?: Observable<any>



    panelOpenState:any;



    isShow: boolean;

    topPosToStartShowing = 100;
    previewImage: string | ArrayBuffer;



    uploadedFiles: any[] = [];

    constructor(public authService: AuthService, private storageService: StorageService,private imageService:ImageService , private router: Router) { }
    decodedToken: any;
    currentUser: User | undefined;
    ngOnInit(): void {
        this.isExposant();
        this.isStudent();
        this.userRole = this.authService.getUserRole();

      //  this.decodedToken=this.storageService.getUser();
/********Get the user connected*********/
        this.authService.CurrentUser().subscribe(
            (user: User) => {
                this.currentUser = user;
                this.qrData = ` monsieur /madame welcome to our platforme Esprit , FirstName  :${this.currentUser.firstName} LastName : ${this.currentUser.lastName} phoneNumber :${this.currentUser.phoneNumber}`;

                console.log('Utilisateur connecté : ', this.currentUser);
            },
            (error) => {
                console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
            }
        );
  /***********************************/





    }
    getImageById(id: string): void {
        this.imageService.getImageById(id).subscribe(data => {
            let blob = new Blob([data], { type: 'image/jpeg' });
            let url = window.URL.createObjectURL(blob);
            // Utilisez l'URL pour afficher l'image
        });
    }
    navigateToLogin() {
        this.router.navigate(['/login']);
    }
    selectFile(event: any): void {

      //  this.selectedFiles = event.target.files;
        this.selectedFiles = event.target.files;
        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);
            if (file) {
                const reader = new FileReader();
                reader.onload = e => this.previewImage = reader.result;
                reader.readAsDataURL(file);
            }
        }
    }
    upload(addForm: NgForm): void {


        this.progress = 0;

        if (this.selectedFiles) {

            const file: File | null = this.selectedFiles.item(0);

            if (file) {

                this.currentFile = file;

                this.authService.upload(this.currentFile).subscribe(

                    (event: any) => {
                        console.log("1");

                        if (event.type === HttpEventType.UploadProgress) {
                            console.log('2');

                            this.progress = Math.round(100 * event.loaded / event.total)
                        } else if (event instanceof HttpResponse) {
                            console.log("3");

                            this.message = event.body.message;



                            location.reload();
                        }
                    },
                    (err: any) => {console.log(err);
                        this.progress = 0;
                        if (err.error && err.error.message) {
                            this.message = err.error.message;
                        } else {
                            this.message = 'Could not upload the file!';
                        }
                        this.currentFile = undefined;
                    });
            }
            this.selectedFiles = undefined;
        }
    }
    logout() {
        this.authService.signOut().subscribe(
            () => {
                console.log('Déconnexion réussie');
                // Après la déconnexion réussie
                this.currentUser = null;

                // Vider le local storage
                localStorage.clear();

                this.router.navigate(['/front/landing']);
                },
            (error) => {
                console.error('Erreur lors de la déconnexion : ', error);
            }
        );
    }


    isExposant(): boolean {
        // Supposons que votre service d'authentification a une méthode getCurrentUser() qui renvoie les informations de l'utilisateur actuellement connecté.
        const currentUser = this.authService.getCurrentUser();
        // Vérifiez si l'utilisateur a le rôle "exposant"
        return currentUser && currentUser.role === 'EXPOSANT';
      }
      isStudent(): boolean {
        // Supposons que votre service d'authentification a une méthode getCurrentUser() qui renvoie les informations de l'utilisateur actuellement connecté.
        const currentUser = this.authService.getCurrentUser();
        // Vérifiez si l'utilisateur a le rôle "exposant"
        return currentUser && currentUser.role === 'Student';
      }

    isEtudiant() {
        return this.userRole === 'Student';
    }
    isEntreprise() {
        return this.userRole === 'EXPOSANT';
    }

}
