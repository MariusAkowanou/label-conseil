import { Component, inject, Input, Output, EventEmitter, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JointUsService } from '../../../../../../../shared/services/api/joint-us.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-job-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './job-modal.component.html',
  styleUrl: './job-modal.component.scss'
})
export class JobModalComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private jointUsService = inject(JointUsService);

  @Input() job: any = null;

  isSubmitting = signal(false);
  error = signal<string | null>(null);
  isSuccess = signal(false);
  applicationForm!: FormGroup;
  jobId = signal('');

  constructor() {
    this.initializeForm();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const jobId = params['id'];
      this.jobId.set(jobId);
    });
  }

  private initializeForm() {
    this.applicationForm = this.fb.group({
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
      ]],
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
      ]],
      currentPosition: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      address: ['', [
        Validators.email,
      ]],
      postalCode: ['', [
        Validators.pattern(/^\d{5}$/)
      ]],
      city: ['', [
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)
      ]],
      country: ['Bénin'],
      profilePhoto: [null],
      cv: [null, [
        Validators.required
      ]],
      website: ['', [
        Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)
      ]],
      facebook: ['', [
        Validators.pattern(/^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/)
      ]],
      linkedin: ['', [
        Validators.pattern(/^(https?:\/\/)?(www\.)?linkedin.com\/[a-zA-Z0-9(\.\?)?]/)
      ]],
      twitter: ['', [
        Validators.pattern(/^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/)
      ]],
      coverLetter: ['', [
        Validators.minLength(100)
      ]],
      motivation: ['', [
        Validators.minLength(50)
      ]],
      availability: [''],
      salary: ['', [
        Validators.pattern(/^\d+$/)
      ]],
      dataConsent: [false, [
        Validators.required
      ]],
      phone: ['', [
        Validators.pattern(/^(\+)?\d{9,15}$/)
      ]],
    });
  }

  ngOnChanges() {
    if (this.job) {
      this.applicationForm.patchValue({ jobId: this.jobId() });
    }
  }

  onFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      this.applicationForm.patchValue({ [fieldName]: file });
    }
  }

  async onSubmit() {
    if (!this.applicationForm.valid) {
      this.error.set('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.isSubmitting.set(true);
    this.error.set(null);

    try {

      const formData = new FormData();
      const formValue = this.applicationForm.value;

      // Ajout des champs texte
      Object.keys(formValue).forEach(key => {
        if (key !== 'profilePhoto' && key !== 'cv') {
          formData.append(key, formValue[key]);
        }
      });

      // Ajout des fichiers
      if (formValue.profilePhoto) {
        formData.append('profile_photo', formValue.profilePhoto);
      }
      if (formValue.cv) {
        formData.append('cv', formValue.cv);
      }
      if (this.jobId()) {
        formData.append('job', this.jobId());
      }
      if (formValue.firstName && formValue.firstName) {
        formData.append('full_name', formValue.firstName + ' ' + formValue.lastName);
      }
      if (formValue.currentPosition) {
        formData.append('current_position', formValue.currentPosition);
      }
      if (formValue.address) {
        formData.append('email', formValue.address);
      }
      if (formValue.postalCode) {
        formData.append('postal_code', formValue.postalCode);
      }

      console.log('Données du formulaire:', this.applicationForm.value);

      const response = await this.jointUsService.submitApplication(formData)
        .pipe(
          catchError((error) => {
            console.error('Erreur lors de la soumission:', error);
            this.error.set('Une erreur est survenue lors de l\'envoi de votre candidature. Veuillez réessayer.');
            return throwError(() => error);
          }),
          finalize(() => {
            this.isSubmitting.set(false);
          })
        )
        .toPromise();

      console.log('Réponse du serveur:', response);
      this.isSuccess.set(true);

    } catch (error) {
      console.error('Erreur dans onSubmit:', error);
      this.error.set('Une erreur inattendue est survenue. Veuillez réessayer.');
    }
  }

  close() {
    this.applicationForm.reset();
    this.isSuccess.set(false);
    this.error.set(null);
    this.router.navigate(['/nous-rejoindre', this.jobId()]);
  }

  resetForm() {
    this.applicationForm.reset();
  }

  // Méthode pour obtenir les messages d'erreur
  getFieldError(fieldName: string): string {
    const field = this.applicationForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return 'Ce champ est obligatoire';
      }
      if (field.errors['minlength']) {
        return `Minimum ${field.errors['minlength'].requiredLength} caractères requis`;
      }
      if (field.errors['pattern']) {
        switch (fieldName) {
          case 'lastName':
          case 'firstName':
          case 'city':
            return 'Seuls les lettres, espaces, apostrophes et tirets sont autorisés';
          case 'postalCode':
            return 'Le code postal doit contenir exactement 5 chiffres';
          case 'website':
            return 'Veuillez entrer une URL valide';
          case 'facebook':
            return 'Veuillez entrer une URL Facebook valide';
          case 'linkedin':
            return 'Veuillez entrer une URL LinkedIn valide';
          case 'twitter':
            return 'Veuillez entrer une URL Twitter valide';
          case 'salary':
            return 'Veuillez entrer un montant valide';
          case 'phone':
            return 'Veuillez entrer un numéro de téléphone valide(+ 229)';
          default:
            return 'Format invalide';
        }
      }
      if (field.errors['requiredTrue']) {
        return 'Vous devez accepter les conditions';
      }
    }
    return '';
  }

  // Méthode pour vérifier si un champ a une erreur
  hasFieldError(fieldName: string): boolean {
    const field = this.applicationForm.get(fieldName);
    return !!(field && field.errors && field.touched);
  }
}
