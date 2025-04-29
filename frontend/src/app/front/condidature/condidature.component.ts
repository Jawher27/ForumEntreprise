import { Component, OnInit } from '@angular/core';
import { Condidature, EtatCondidature } from 'src/app/core/models/condidature';
import { User } from 'src/app/core/models/user';
import { CondidatureService } from 'src/app/core/services/condidature.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Offre } from 'src/app/core/models/Offre';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-condidature',
    templateUrl: './condidature.component.html',
    styleUrls: ['./condidature.component.css'],
    providers: [CondidatureService]
})
export class CondidatureComponent implements OnInit {
    candidatureForm: FormGroup;
    offreId: number;
    userId: number;
    isSubmitting = false;
    errorMessage = '';
    cvFile: File | null = null;
    coverLetterFile: File | null = null;
    etatCondidature = 'Waitlisted';
    showSuccessAlert = false;
    showFailedsAlert = false;
    currentUser: User;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private condidatureService: CondidatureService,
        private router: Router,
        private authService: AuthService
    ) {
        // Initialiser le FormGroup dans le constructeur
        this.candidatureForm = this.fb.group({
            cv: [null, Validators.required],
            coverLetter: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.offreId = +params['offreId'];
            this.userId = +params['userId'];
            console.log('offreId from route:', this.offreId);
            console.log('userId from route:', this.userId);
        });
    }

    onCvChange(event: any): void {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file.type === 'application/pdf') {
                this.cvFile = file;
                this.candidatureForm.patchValue({
                    cv: file
                });
            } else {
                this.errorMessage = 'Le CV doit être un fichier PDF';
                this.cvFile = null;
                this.candidatureForm.patchValue({
                    cv: null
                });
            }
        }
    }

    onCoverLetterChange(event: any): void {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file.type === 'application/pdf') {
                this.coverLetterFile = file;
                this.candidatureForm.patchValue({
                    coverLetter: file
                });
            } else {
                this.errorMessage = 'La lettre de motivation doit être un fichier PDF';
                this.coverLetterFile = null;
                this.candidatureForm.patchValue({
                    coverLetter: null
                });
            }
        }
    }

    onSubmit(): void {
        this.errorMessage = '';

        if (this.candidatureForm.invalid) {
            this.errorMessage = 'Veuillez télécharger tous les documents requis';
            return;
        }

        if (!this.cvFile || !this.coverLetterFile) {
            this.errorMessage = 'Veuillez télécharger tous les documents requis';
            return;
        }

        this.isSubmitting = true;

        this.condidatureService.submitCandidature(
            this.offreId,
            this.userId,
            EtatCondidature.Pending,
            this.coverLetterFile,
            this.cvFile
        ).subscribe({
            next: (response) => {
                this.isSubmitting = false;
                this.showSuccessAlert = true;
                setTimeout(() => {
                    this.showSuccessAlert = false;
                    // Rediriger vers la page de détails de la candidature
                    this.router.navigate(['/candidatures', response.idCondidature]);
                }, 3000);
            },
            error: (error) => {
                this.isSubmitting = false;
                this.errorMessage = error.error || 'Une erreur est survenue lors de la soumission';
                this.showFailedsAlert = true;
                setTimeout(() => {
                    this.showFailedsAlert = false;
                }, 3000);
            }
        });
    }

    openSuccessAlert() {
        this.showSuccessAlert = true;
        setTimeout(() => {
            this.showSuccessAlert = false;
        }, 3000);
    }

    closeAlert() {
        this.showSuccessAlert = false;
    }

    openFailedAlert() {
        this.showFailedsAlert = true;
        setTimeout(() => {
            this.showFailedsAlert = false;
        }, 3000);
    }

    closeFailedAlert() {
        this.showFailedsAlert = false;
    }
}
