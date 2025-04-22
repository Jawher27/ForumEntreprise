import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Announcement } from 'src/app/core/models/Announcment';
import { TypeAnnonce } from 'src/app/core/models/typeAnnonce';
import { AnnouncmentServiceService } from 'src/app/core/services/announcment-service.service';
import { TypeAnnouncementService } from 'src/app/core/services/type-announcement.service';

@Component({
  selector: 'app-post-type-announcment',
  templateUrl: './post-type-announcment.component.html',
  styleUrls: ['./post-type-announcment.component.css']
})
export class PostTypeAnnouncmentComponent implements OnInit {
  typeAnnonces: TypeAnnonce[] = [];
  selectedLibelle: string = '';
  requiredSupply: number = 0;
  announcements: Announcement[] = [];

  constructor(private announcementService: AnnouncmentServiceService, private typeanserviec:TypeAnnouncementService) { }

  ngOnInit(): void {
    this.getTypeAnnonces();
  }

  getTypeAnnonces(): void {
    this.typeanserviec.getAllTypes()
      .subscribe(typeAnnonces => {
        this.typeAnnonces = typeAnnonces;
      }, error => {
        console.error('Erreur lors de la récupération des types d\'annonce:', error);
      });
  }

  getRecommendedAnnouncements(): void {
    this.announcementService.recommendAnnouncements(this.selectedLibelle, this.requiredSupply)
      .subscribe(announcements => {
        this.announcements = announcements;
      }, error => {
        console.error('Erreur lors de la récupération des annonces recommandées:', error);
      });
  }
}
//   typeId: number;
//   announcment: Announcement
//   types: TypeAnnonce[] = [];
//   selectedType: number;
//   allAnnouncements: Announcement[] = [];
//   filteredAnnouncements: Announcement[] = [];
//   libelles: TypeAnnonce[] = []; // Liste pour stocker les libellés

//   constructor(
//     // private route: ActivatedRoute,
//     // private typeAnnouncementService: TypeAnnouncementService
//     private announcementService: TypeAnnouncementService,private AnnService:AnnouncmentServiceService
//   ) {}

//   ngOnInit(): void {
//     this.getLibelles();


//     //  this.loadAllTypes();
//     // this.route.params.subscribe(params => {
//     //   const typeIdFromRoute = params['typeId'];
//     //   if (typeIdFromRoute !== undefined) {
//     //     this.typeId = +typeIdFromRoute; // Convert to number
//     //     this.loadTypeAnnouncements(this.typeId);
//     //   } else {
//     //     console.error('No typeId found in route parameters');
//     //   }
//     // });
//   }

//   getLibelles(): void {
//     this.announcementService.getAllTypes()
//       .subscribe(libelles => {
//         this.libelles = libelles; // Stocker les libellés récupérés dans la liste
//       }, error => {
//         console.error('Erreur lors de la récupération des libellés:', error);
//       });
//   }
//   addAnnouncementWithType(): void {
//     // Récupérer le TypeAnnonce correspondant au libellé sélectionné
//     const selectedTypeAnnonce = this.libelles.find(libelle => libelle.libelle === this.libelle);
//     if (selectedTypeAnnonce) {
//   //    this.announcement.typeAnnonce = selectedTypeAnnonce;
      
//       this.AnnService.addAnnouncementWithType(selectedTypeAnnonce.libelle,this.announcement,3)//+1 cuurentUser.id
//         .subscribe(addedAnnouncement => {
//           console.log('Annonce ajoutée:', addedAnnouncement);
//           this.announcement = new Announcement();
//           this.libelle = '';
//         }, error => {
//           console.error('Erreur lors de l\'ajout de l\'annonce:', error);
//         });
//     } else {
//       console.error('Libellé sélectionné non trouvé.');
//     }
//   }

















//   // loadAllTypes(): void {
//   //   this.typeAnnouncementService.getAllTypes().subscribe(
//   //     (data: TypeAnnonce[]) => {
//   //       this.types = data;
//   //     },
//   //     (error) => {
//   //       console.error('Error retrieving types:', error);
//   //     }
//   //   );
//   // }
//   // loadTypeAnnouncements(typeId: number): void {
//   //   this.typeAnnouncementService.getAnnouncementsByType(typeId).subscribe(
//   //     (data: Announcement[]) => {
//   //       this.allAnnouncements = data;
//   //       console.log('Announcements retrieved:', data);
//   //     },
//   //     (error) => {
//   //       console.error('Error retrieving announcements:', error);
//   //     }
//   //   );
//   // }

//   // loadTypeAnnouncements(typeId: number): void {
//   //   this.typeAnnouncementService.getAnnouncementsByType(typeId).subscribe(
//   //     (data: Announcement[]) => {
//   //       this.filteredAnnouncements = data;
//   //       console.log('Announcements retrieved:', data);
//   //     },
//   //     (error) => {
//   //       console.error('Error retrieving announcements:', error);
//   //     }
//   //   );
//   // }

//   // loadTypeAnnouncements(typeId: number): void {
//   //   this.typeAnnouncementService.getAnnouncementsByType(typeId).subscribe(
//   //     (data: Announcement[]) => {
//   //       this.allAnnouncements = data;
//   //       console.log('Announcements retrieved:', data);
//   //     },
//   //     (error) => {
//   //       console.error('Error retrieving announcements:', error);
//   //     }
//   //   );
//   // }
 
// }
