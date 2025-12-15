import { Component, OnInit, inject, signal } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from '../../../../../shared/services/local/seo.service';
import { ContactService, ContactData } from '../../../../../shared/services/api/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  private seo = inject(SeoService);
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  //activeForm = signal<'recruiter' | 'join' | 'evolve' | 'career'>('recruiter');
  isSubmitting = signal(false);

  // Formulaires
  recruiterForm!: FormGroup;
  joinForm!: FormGroup;
  evolveForm!: FormGroup;
  careerForm!: FormGroup;

  // Données des expertises Label Conseil

  contactReasons = [
    'Je souhaite un RDV découverte pour mieux comprendre l\'offre Label Conseils',
  ];

  ngOnInit() {
    this.seo.setContactPage();
    this.initializeForms();
  }

  private initializeForms() {
    // Formulaire Carrière
    this.careerForm = this.fb.group({
      contactType: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      currentPosition: [''],
      company: [''],
      requestType: ['', Validators.required],
      details: ['', Validators.required]
    });
  }

  /*setActiveForm(form: 'recruiter' | 'join' | 'evolve' | 'career') {
    this.activeForm.set(form);
  }*/

  onFileChange(event: any, formName: string) {
    const file = event.target.files[0];
    if (file) {
      if (formName === 'join') {
        this.joinForm.patchValue({ cv: file });
      } else if (formName === 'evolve') {
        this.evolveForm.patchValue({ cv: file });
      }
    }
  }

  onSubmit(formType: string) {
    this.isSubmitting.set(true);

    if (this.careerForm.valid) {
      // Préparer les données pour l'API
      const formData = this.careerForm.value;
      const contactData: ContactData = {
        ...formData,
        contactType: formType as 'recruiter' | 'join' | 'evolve' | 'career'
      };

      // Envoyer les données via le service
      this.contactService.submitInformationContact(contactData).subscribe({
        next: (response) => {
          console.log('Contact envoyé avec succès:', response);
          this.isSubmitting.set(false);
          alert('Formulaire envoyé avec succès !');
          this.careerForm.reset();
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi:', error);
          this.isSubmitting.set(false);
          alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
        }
      });
    } else {
      this.isSubmitting.set(false);
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}