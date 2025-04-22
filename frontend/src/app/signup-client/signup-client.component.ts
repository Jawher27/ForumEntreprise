import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from "../core/services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.css']
})
export class SignupClientComponent  {

  test: Date = new Date();
  focus;
  focus1;
  focus2;

  validateForm !: FormGroup;
  cinError: String = '';
  phoneNumberError: String = '';
  emailError: String = '';
  passwordError: String = '';

  constructor(private fb: FormBuilder, private authService: AuthService

      , private router: Router, private http: HttpClient
  ) {
  }

  // ngOnInit() {
  //   this.validateForm = this.fb.group({
  //     firstName: [null, [ Validators.required]],
  //     lastName: [null, [Validators.required]],
  //
  //     password: [null, [Validators.required]],
  //     confirmPassword: [null, [Validators.required, this.passwordValidator]],
  //     phoneNumber: [null, [Validators.required, this.phoneNumberValidator]],
  //     cin: [null, [Validators.required, this.cinValidator]],
  //     cv: [null, [Validators.required]],
  //
  //     email: [null, [Validators.email,Validators.required, this.emailValidator]],
  //   });
  //
  // }
  // passwordMismatch(): boolean {
  //   return this.validateForm.get('password')?.value !== this.validateForm.get('confirmPassword')?.value;
  // }

  ngOnInit() {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      password: [null, [Validators.required, this.passwordValidator]],
      confirmPassword: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, this.phoneNumberValidator]],
      cin: [null, [Validators.required, this.cinValidator]],
      //cv: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required, this.emailValidator]],
    }, { validators: this.passwordMatchValidator });
  }
  cinValidator(control: AbstractControl): ValidationErrors | null {
    const cin = control.value;
    if (cin && cin.length !== 8) {
      return { 'cinLength': true };
    }
    if (cin && !/^\d+$/.test(cin)) {
      return { 'cinDigits': true };
    }
    return null;
  }

  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumber = control.value;
    if (phoneNumber && phoneNumber.length !== 8) {
      return { 'phoneNumberLength': true };
    }
    if (phoneNumber && !/^[259]\d{7}$/.test(phoneNumber)) {
      return { 'phoneNumberPattern': true };
    }
    return null;
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return { 'emailPattern': true };
    }
    return null;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (password && !/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).+/.test(password)) {
      return { 'passwordPattern': true };
    }
    return null;
  }

  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;
    if (password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  }
  passwordMismatch(): boolean {
    return this.validateForm.get('password')?.value !== this.validateForm.get('confirmPassword')?.value;
  }

  submitForm() {
    this.cinError = this.validateForm.get('cin').errors ? 'CIN invalide' : '';
    this.phoneNumberError = this.validateForm.get('phoneNumber').errors ? 'Numéro invalide' : '';
    this.emailError = this.validateForm.get('email').errors ? 'Email invalide' : '';
    this.passwordError = this.validateForm.get('password').errors ? 'Mot de passe invalide' : '';

    if (this.validateForm.valid && !this.passwordMismatch()) {
      console.log("aaaaaaa1", this.validateForm.value);
      console.log('Form Submitted!');

      this.authService.signupClient(this.validateForm.value).subscribe(
          res => {
            console.log('User Added Successfully');
            Swal.fire({
              customClass: { popup: 'animated tada' },
              animation: false,

              icon: 'success',
              title: 'Gongratulations!Your Registration has been saved',
              showConfirmButton: false,


            });
            // Redirection après 3 secondes
            setTimeout(() => {
              this.router.navigate(['/front/landing']);
            }, 3000);





          }, error => {
            console.log('Error Adding User',error);




          });
    } else {
      this.validateForm.markAllAsTouched();
    }
  }


}
