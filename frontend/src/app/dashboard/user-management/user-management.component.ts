import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {User} from "../../core/models/user";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
users:User[];
  closeResult: string;
  validateForm !: FormGroup;
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  focus6;
  constructor(private userService: AuthService,private modalService: NgbModal,private fb: FormBuilder , private authService: AuthService, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      firstName: [null, [ Validators.required]],
      lastName: [null, [Validators.required]],

      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      cin: [null, [Validators.required]],


      email: [null, [Validators.email,Validators.required]],
    });
    this.GetAllUsers();
    // this.setCustomErrorMessages();
  }
  passwordMismatch()  : boolean {
    return this.validateForm.get('password')?.value !== this.validateForm.get('confirmPassword')?.value;
  }
  GetAllUsers() {
    this.userService.getAllUser().subscribe(data => {
      this.users = data;
      console.log(data);
    });

  }
  submitForm() {
    console.log("aaaaaaa",this.validateForm.value);
    if(this.validateForm.valid && !this.passwordMismatch()) {

      console.log('Form Submitted!');



      this.authService.AddAdmin(this.validateForm.value).subscribe(
          res =>
          {
            console.log('User Added Successfully');
            this.GetAllUsers();
            Swal.fire({
              customClass: { popup: 'animated tada' },
              animation: false,

              icon: 'success',
              title: 'Gongratulations!Your Admin is register',
              showConfirmButton: false,


            });
            // Redirection après 3 secondes
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 3000);





          },
          error => {
            console.log('Error Adding Admin',error);




          });
    }
  }
/*
  addAdmin() {
    this.userService.AddAdmin(User).subscribe(response => {
      console.log(response); // Vous verrez le message de confirmation ici
      if (response === 'User added successfully') {
        this.GetAllUsers();
      } else {
        console.log(response); // Vous verrez le message de confirmation ici

      }
    });
  }*/

  banUser(id: number, banDuration: number) {
    this.GetAllUsers()
    console.time("banUser"); // Démarrer le chronomètre pour le bannissement
    this.userService.disableUser(id).subscribe(() => {
      setTimeout(() => {
        console.timeEnd("banUser"); // Arrêter le chronomètre une fois la durée de bannissement écoulée
        this.userService.enableUser(id).subscribe(() => {
          this.GetAllUsers();
        });
      }, banDuration);
    });
  }

  onBanButtonClick(userid: number) {
    console.log(userid);
    this.banUser(userid, 2 * 60 * 1000);


  }
  onDisBanButtonClick(userId: number) {
    this.userService.enableUser(userId).subscribe(response => {
      console.log(response); // Vous verrez le message de confirmation ici
      if (response === 'User banned successfully') {
        this.GetAllUsers();
      } else {
        console.log(response); // Vous verrez le message de confirmation ici

      }
    });
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