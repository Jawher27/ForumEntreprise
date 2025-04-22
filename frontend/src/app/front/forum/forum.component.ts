import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/core/models/Forum';
import { AuthService } from 'src/app/core/services/auth.service';
import { ForumService } from 'src/app/core/services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  f:Forum= new Forum();
    userRole: string | null = null;

  constructor(private forumServive:ForumService,private authService: AuthService) { }

  ngOnInit(): void {
  //  this.isExposant();
    this.getLatestForum();
      this.userRole = this.authService.getUserRole();
  }
  private getLatestForum(){
    this.forumServive.getLatestForum().subscribe(data =>{
      
        this.f=data;
     });

 }
//  isExposant(): boolean {
//   // Supposons que votre service d'authentification a une méthode getCurrentUser() qui renvoie les informations de l'utilisateur actuellement connecté.
//   const currentUser = this.authService.getCurrentUser();
//   if( currentUser.role === 'EXPOSANT')
//   return true;
//   // Vérifiez si l'utilisateur a le rôle "exposant"
//   return false;
// }

    isExposant() {
        return this.userRole === 'EXPOSANT';
    }
}




