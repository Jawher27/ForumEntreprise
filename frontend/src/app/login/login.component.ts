import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/services/auth.service"
import {StorageService} from "../core/services/storage.service";

import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";
//import {Subscriber} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  focus;
  focus1;

  validateForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,private http: HttpClient) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  ngOnInit() {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }



  submitForm(): void {
    console.log("debut submitForm");
    if (this.validateForm.valid) {
      console.log("submitForm valid")
      const email = this.validateForm.get('email')!.value;
      const password = this.validateForm.get('password')!.value;
      this.authService.login(email, password).subscribe(
          (res: any) => {
            console.log("res",res);
            console.log("res.token",res.token);
            if (res ) {
              console.log('Login successful:', res);
              localStorage.setItem('token', JSON.stringify(res.token));
              Swal.fire({
                icon: 'success',
                title: 'Login successful',
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                this.router.navigate(['/front/profile']);
              });
            }
          },
          (error) => {
            console.error('Request failed:', error);
            if (error.status === 401) { // Remplacez 401 par le code d'état approprié renvoyé par votre serveur en cas d'échec de l'authentification
              Swal.fire({
                icon: 'error',
                title: 'Login failed,Verify your Credentials',
                showConfirmButton: false,
                timer: 2000
              });
            } else {


Swal.fire({
  title: "THIS ACCOUNT IS BANNED",
  text: "TRY TO COMMINUCATE WITH THE ADMINISTRATORS",
  imageUrl: "https://t3.ftcdn.net/jpg/05/82/35/42/360_F_582354289_L6C0CfftpibA1VAgveCpLaDH8lU4TaAV.jpg",
  imageWidth: 400, imageHeight: 200, imageAlt: "Custom image" ,
    showConfirmButton: false,
    timer: 3000,

});
            }
          }
      );
    } else {
      console.log('Form is not valid');
    }

}}
