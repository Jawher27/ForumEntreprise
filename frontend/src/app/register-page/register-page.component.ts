import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/services/auth.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  closeResult: string;
  validateForm: FormGroup;
  @ViewChild('classic1') classic1: any;
  @ViewChild('classic2') classic2: any;



  constructor(private fb: FormBuilder,private modalService: NgbModal, private router: Router, private authService: AuthService,) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }


  ngOnInit() {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }




  openLoginAdmin(){
    this.open(this.classic1, 'modal_mini', 'sm');
  }
  openLogin(){
    this.open(this.classic2, 'modal_mini', 'sm');

  }

  submitFormL(): void {
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
                this.router.navigate(['/front/landing']);
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
                this.router.navigate(['/dashboard']);
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

  }
  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content,{ centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}
