import { Component,  Input, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {CondidatureService} from '../core/services/condidature.service';
import {Condidature} from '../core/models/condidature';

@Component({
  selector: 'app-candidaturedetails',
  templateUrl: './candidaturedetails.component.html',
  styleUrls: ['./candidaturedetails.component.css']
})
export class CandidaturedetailsComponent implements OnInit {
  candidature: Condidature | null = null;
  isLoading = true;
  errorMessage = '';
  cvUrl: SafeResourceUrl | null = null;
  coverLetterUrl: SafeResourceUrl | null = null;
  showCv = false;
  showCoverLetter = false;

  constructor(
      private route: ActivatedRoute,
      private candidatureService: CondidatureService,
      private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loadCandidature(id);
  }

  loadCandidature(id: number): void {
    this.isLoading = true;
    this.candidatureService.getCandidature(id).subscribe({
      next: (data) => {
        this.candidature = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Impossible de charger les détails de la candidature';
        this.isLoading = false;
      }
    });
  }

  viewCV(): void {
    if (this.candidature?.idCondidature && !this.cvUrl) {
      this.candidatureService.downloadCV(this.candidature.idCondidature).subscribe({
        next: (blob) => {
          const pdfBlob = new Blob([blob], { type: 'application/pdf' });
          const objectUrl = URL.createObjectURL(pdfBlob);
          this.cvUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
          this.showCv = true;
          this.showCoverLetter = false;
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors du chargement du CV';
        }
      });
    } else {
      // Si le CV est déjà chargé, on affiche juste le PDF
      this.showCv = true;
      this.showCoverLetter = false;
    }
  }

  viewCoverLetter(): void {
    if (this.candidature?.idCondidature && !this.coverLetterUrl) {
      this.candidatureService.downloadCoverLetter(this.candidature.idCondidature).subscribe({
        next: (blob) => {
          const pdfBlob = new Blob([blob], { type: 'application/pdf' });
          const objectUrl = URL.createObjectURL(pdfBlob);
          this.coverLetterUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
          this.showCoverLetter = true;
          this.showCv = false;
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors du chargement de la lettre de motivation';
        }
      });
    } else {
      // Si la lettre est déjà chargée, on affiche juste le PDF
      this.showCoverLetter = true;
      this.showCv = false;
    }
  }

  closeViewer(): void {
    this.showCv = false;
    this.showCoverLetter = false;
  }

  // Optionnel: Méthode pour nettoyer les URL lorsque le composant est détruit
  ngOnDestroy(): void {
    if (this.cvUrl) {
      URL.revokeObjectURL(this.cvUrl.toString());
    }
    if (this.coverLetterUrl) {
      URL.revokeObjectURL(this.coverLetterUrl.toString());
    }
  }
}
