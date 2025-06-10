import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  validateForm: FormGroup;
  showModalLogin: boolean = false;
  showModalAdmin: boolean = false;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit() {}

  openLoginAdmin() {
    this.showModalAdmin = true;
  }

  openLogin() {
    this.showModalLogin = true;
  }

  closeModal() {
    this.showModalLogin = false;
    this.showModalAdmin = false;
  }

  submitForm(destination: 'user' | 'admin'): void {
    if (this.validateForm.valid) {
      const email = this.validateForm.get('email')!.value;
      const password = this.validateForm.get('password')!.value;
      this.authService.login(email, password).subscribe(
          (res: any) => {
            if (res) {
              localStorage.setItem('token', JSON.stringify(res.token));
              Swal.fire({
                icon: 'success',
                title: 'Login successful',
                showConfirmButton: false,
                timer: 2000,
              }).then(() => {
                this.router.navigate([destination === 'admin' ? '/dashboard' : '/front/landing']);
                this.closeModal();
              });
            }
          },
          (error) => {
            if (error.status === 401) {
              Swal.fire({
                icon: 'error',
                title: 'Login failed, Verify your Credentials',
                showConfirmButton: false,
                timer: 2000,
              });
            } else {
              Swal.fire({
                title: 'THIS ACCOUNT IS BANNED',
                text: 'TRY TO COMMUNICATE WITH THE ADMINISTRATORS',
                imageUrl: 'https://t3.ftcdn.net/jpg/05/82/35/42/360_F_582354289_L6C0CfftpibA1VAgveCpLaDH8lU4TaAV.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
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
}
