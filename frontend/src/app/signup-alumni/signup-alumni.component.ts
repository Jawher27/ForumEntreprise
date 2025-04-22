import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {HttpClient} from "@angular/common/http";
import { ImageService } from '../core/services/image.service';
import {fileURLToPath} from "url";




@Component({
  selector: 'app-signup-alumni',
  templateUrl: './signup-alumni.component.html',
  styleUrls: ['./signup-alumni.component.css']
})
export class SignupAlumniComponent {

  test: Date = new Date();
  focus;
  focus1;
  focus2;
  imgURL: any;
  public imagePath: string;

  validateForm !: FormGroup;
  userFile: string;

  constructor(private fb: FormBuilder, private authService: AuthService
      , private router: Router, private imageUploadService: ImageService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],

      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      cin: [null, [Validators.required]],
      cv: [null, [Validators.required]],
      picture: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
    });
    // this.setCustomErrorMessages();
  }



  /*onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      let fileName = file.name;
      if (fileName.includes('\\')) {
        // Si le nom du fichier contient '\\', divisez la chaîne et prenez le dernier élément
        fileName = fileName.split('\\').pop();
      }
      this.userFile = fileName; // Stocker uniquement le nom du fichier

      // Pour afficher l'image sélectionnée
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }*/
  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file; // Stocker le fichier lui-même

      // Pour afficher l'image sélectionnée
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }

  submitForm() {
    const formData = new FormData();
    const user= this.validateForm.value;
    formData.append('user', JSON.stringify(user));
    formData.append('file', this.userFile); // Ajouter le fichier à formData
    console.log("a",this.validateForm.value);
    if(this.validateForm.valid && !this.passwordMismatch()) {

      console.log('Form Submitted!');

      this.authService.signupCompany(formData).subscribe(
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
    }
  }
  /*uploadImage(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('picture', file);

    this.http.post('http://localhost:9090/user/upload', formData).subscribe(
        (res: any) => {
          console.log('Upload successful');
          this.validateForm.get('picture').setValue(res.imageUrl); // Set the picture form control value to the image URL
        },
        err => {
          console.error('Upload error', err);
        }
    );
  }*/


  passwordMismatch()  : boolean {
    return this.validateForm.get('password')?.value !== this.validateForm.get('confirmPassword')?.value;
  }
  /*submitForm() {
   // this.validateForm.value.cin=3;
    const formData = new FormData();
    const user= this.validateForm.value;
    formData.append('user', JSON.stringify(user));
    formData.append('file', this.userFile);
    console.log("a",this.validateForm.value);
    if(this.validateForm.valid && !this.passwordMismatch()) {

      console.log('Form Submitted!');


      this.authService.signupCompany(formData).subscribe(
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
    }
  }*/
  /*submitForm() {
    const formData = new FormData();
    const user= this.validateForm.value;
    formData.append('user', JSON.stringify(user));
    formData.append('file', this.userFile); // Utiliser le nom du fichier
    console.log("a",this.validateForm.value);
    if(this.validateForm.valid && !this.passwordMismatch()) {

      console.log('Form Submitted!');

      this.authService.signupCompany(formData).subscribe(
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
    }
  }*/

  protected readonly event = event;

}
