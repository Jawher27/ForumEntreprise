import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {catchError, map, Observable, Subject, throwError} from "rxjs";
import {ForumService} from "./forum.service";
import {StorageService} from "./storage.service";
const BASE_URL = 'http://localhost:9090/user/';
import { JwtHelperService } from '@auth0/angular-jwt';

export const AUTH_HEADER='authorization';

import {Router} from "@angular/router";
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'

})
export class AuthService {

  constructor(private httpClient: HttpClient,private storageService: StorageService,public jwtHelper: JwtHelperService ,private router:Router){
  }

  signupCompany(signupRequestDto: any): Observable<any> {
    return this.httpClient.post(BASE_URL + 'Company/signup', signupRequestDto)
  }

  signupClient(signupRequestDto: any): Observable<any> {
    return this.httpClient.post(BASE_URL + 'Client/signup', signupRequestDto)
  }
    AddAdmin(signupRequestDto: any): Observable<any> {
        return this.httpClient.post(BASE_URL + 'addAdmin', signupRequestDto)
    }

  signupAlumni(signupRequestDto: any): Observable<any> {
    return this.httpClient.post(BASE_URL + 'Alumni/signup', signupRequestDto)
  }


    upload(file: File): Observable<HttpEvent<any>> {

        const formData: FormData = new FormData();

        formData.append('file', file);





        const req = new HttpRequest('POST', BASE_URL +`upload`, formData, {

            reportProgress: true,

            responseType: 'json'

        });



        return this.httpClient.request(req);

    }
getbyEmail(email: string): Observable<any> {
      return this.httpClient.get(BASE_URL + `Email/${email}`);
  }
  getById(id: number): Observable<any> {
    return this.httpClient.get(BASE_URL + `id/${id}`);
  }


    CurrentUser(): Observable<User | undefined> {
        const decodedToken = this.storageService.getUser(); // Supposons que vous avez une méthode getUser() dans storageService
        if (decodedToken) {
            const email: string = decodedToken.sub;
            return this.getbyEmail(email);
        } else {
            return new Observable<User | undefined>(); // Retourner un Observable vide si le token n'est pas présent
        }
    }


    login(email: string, password: string): Observable<any> {
        return this.httpClient.post(`http://localhost:9090/user/authenticate`, { email, password }, { observe: 'response', responseType: 'text' })
            .pipe(
                map(response => {
                    try {
                        // Check the Content-Type of the response
                        const contentType = response.headers.get('Content-Type');
                        console.log(`Content-Type: ${contentType}`);

                        // Check if the JWT token is present in the response
                        if (response.body) {
                            console.log('Raw token:', response.body); // Log the raw token

                            // Store the JWT token in local storage
                            localStorage.setItem('token', response.body.sub());

                            // Decode the JWT token to get user information
                            const decodedToken = this.decodeToken();
                            console.log('Decoded token:', decodedToken);
                            var email = decodedToken.sub// Print the decoded token
                            this.getbyEmail(email).subscribe(data => {
                                localStorage.setItem('role',data.role);});

                            localStorage.setItem('loggedUser', JSON.stringify(decodedToken)); // Use 'sub' instead of 'username'
                            localStorage.setItem('isloggedIn', String(true));
                            localStorage.setItem('Token', response.body);


                        }
                        return response.body;
                    } catch (error) {
                        console.error('Error processing response:', error);
                        throw error;
                    }
                }),
                catchError(error => {
                    console.error('Error during login:', error);
                    return throwError(error);
                })
            );
    }

    getUserRole(): string | null {
        return localStorage.getItem('role');
    }


   /* isAuthenticated(): boolean {
        const token = localStorage.getItem('token');

        // Vérifiez si le token existe
        if (!token) {
            console.error('Le token est null ou undefined');
            return false;
        }

        // Vérifiez si le token est un JWT valide
        try {
            const decodedToken = this.jwtHelper.decodeToken(token);
            if (!decodedToken || typeof decodedToken !== 'object') {
                console.error('Le token n\'est pas un JWT valide');
                return false;
            }

            // Vérifiez si le token est expiré
            return !this.jwtHelper.isTokenExpired(token);
        } catch (error) {
            console.error('Erreur lors de la vérification du token JWT : ', error);
            return false;
        }
    }
*/
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');

        // Check if the token exists
        if (!token) {
            console.error('Token is null or undefined');
            return false;
        }

        // Check if the token is a valid JWT
        const parts = token.split('.');
        if (parts.length !== 3) {
            console.error('Token is not a valid JWT');
            return false;
        }

        // Check if the token is expired
        const isExpired = this.jwtHelper.isTokenExpired(token);
        if (isExpired) {
            console.error('Token is expired');
            return false;
        }

        return true;
    }
    public decodeToken(): any {
        const token = localStorage.getItem('token');
        console.log ("token",token);

        if (!token) {
            return null;
        }

        return this.jwtHelper.decodeToken(token);
    }
    getCurrentUser(): any {

    }

    getAllUser(): Observable<User[]>{
        return this.httpClient.get<User[]>(BASE_URL + 'allUser');
    }


    signOut(): Observable<any> {

        // Après la déconnexion réussie


        return this.httpClient.post<any>('http://localhost:9090/user/signout',{});
    }
    disableUser(id: number): Observable<string> {
        return this.httpClient.put(BASE_URL+`ban/${id}`, {}, { responseType: 'text' });
    }

    enableUser(id: number): Observable<string> {
        return this.httpClient.put(BASE_URL+`Disban/${id}`, {}, { responseType: 'text' });
    }
    signOutt() {
        // Clear all local authentication data
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token'); // If you use 'token' to track the authenticated user
        // Log the sign out action
        console.log('User signed out');
        // Redirect to login page
        this.router.navigate(['/front/landing']);
    }






}
