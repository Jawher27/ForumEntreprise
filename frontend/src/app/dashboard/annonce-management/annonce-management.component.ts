import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/core/models/Announcment';
import { TypeAnnonce } from 'src/app/core/models/typeAnnonce';
import { TypeAnnouncementService } from 'src/app/core/services/type-announcement.service';

@Component({
  selector: 'app-annonce-management',
  templateUrl: './annonce-management.component.html',
  styleUrls: ['./annonce-management.component.css']
})
export class AnnonceManagementComponent implements OnInit {
  types: TypeAnnonce[] = [];
  announcements: Announcement[] = [];
  selectedTypeId: number | undefined;
  announcement: Announcement = new Announcement();
  libelle: string = '';
  constructor(private announcementService: TypeAnnouncementService) { }

  ngOnInit(): void {
    this.loadTypes();
  }

  loadTypes() {
    this.announcementService.getAllTypes().subscribe(types => {
      this.types = types;
    });
  }

  onTypeChange() {
    if (this.selectedTypeId) {
      this.announcementService.getAnnouncementsByType(this.selectedTypeId).subscribe(announcements => {
        this.announcements = announcements;
      });
    }
  }

}
