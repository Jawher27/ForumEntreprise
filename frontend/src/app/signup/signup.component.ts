import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/services/auth.service";
import {User} from "../core/models/user";
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']

})
export class SignupComponent {
    test : Date = new Date();
    focus;
    focus1;
    focus2;

    validateForm !: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private http: HttpClient) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            //firstName: [null, [ Validators.required]],
            lastName: [null, [Validators.required]],

            password: [null, [Validators.required]],
            confirmPassword: [null, [Validators.required]],
            phoneNumber: [null, [Validators.required]],
            // cin: [null, [Validators.required]],
          //  cv: [null, [Validators.required]],
           // picture: [null, [Validators.required]],
            email: [null, [Validators.email,Validators.required]],
        });

       // this.setCustomErrorMessages();
    }






    passwordMismatch()  : boolean {
        return this.validateForm.get('password')?.value !== this.validateForm.get('confirmPassword')?.value;
    }
    submitForm() {
        console.log("aaaaaaa",this.validateForm.value);
        
        if(this.validateForm.valid && !this.passwordMismatch()) {

            console.log('Form Submitted!');



             this.authService.signupCompany(this.validateForm.value).subscribe(
                  res =>
                  {
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





                  },
                     error => {
                        console.log('Error Adding User',error);




                  });
        }
    }

}
