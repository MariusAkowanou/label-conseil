import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeoService } from '../../../../../shared/services/local/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  private seo = inject(SeoService);
  private fb = inject(FormBuilder);

  activeForm = signal<'recruiter' | 'join' | 'evolve' | 'career'>('recruiter');
  isSubmitting = signal(false);

  // Formulaires
  recruiterForm!: FormGroup;
  joinForm!: FormGroup;
  evolveForm!: FormGroup;
  careerForm!: FormGroup;

  // Données des expertises Label Conseil
  expertises = [
    'Carrière',
    'Consulting',
    'Digital',
    'Stratégies de territoires',
    'Services économiques et financiers',
    'Gestion de la productivité humaine',
    'Conseil juridique',
    'Expertise rurale',
    'Études sectorielles',
    'Expertise sociale',
    'Stratégies d\'entreprise',
    'Service marketing',
    'Assistance en gestion',
    'Gestion et développement des coopératives',
    'Conseil en fiscalité',
    'Gestion de l\'information et des systèmes',
    'Gestion des opérations et de la production'
  ];

  contactReasons = [
    'Je souhaite être accompagné(e) dans ma transition professionnelle',
    'Je cherche un coach pour un manager ou dirigeant de mon entreprise',
    'Je souhaite en savoir plus sur l\'accompagnement individuel',
    'Je cherche une solution d\'accompagnement collectif',
    'Je souhaite un RDV découverte pour mieux comprendre l\'offre Label Conseil',
    'Autre (précisez ci-dessous)'
  ];

  ngOnInit() {
    this.seo.setContactPage();
    this.initializeForms();
  }

  private initializeForms() {
    // Formulaire Recruteur
    this.recruiterForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

    // Formulaire Nous rejoindre
    this.joinForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      cv: [null]
    });

    // Formulaire Évoluer
    this.evolveForm = this.fb.group({
      opportunity: ['', Validators.required],
      expertise: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      linkedin: ['', Validators.required],
      cv: [null],
      comment: ['']
    });

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

  setActiveForm(form: 'recruiter' | 'join' | 'evolve' | 'career') {
    this.activeForm.set(form);
  }

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

    let form: FormGroup;
    switch (formType) {
      case 'recruiter': form = this.recruiterForm; break;
      case 'join': form = this.joinForm; break;
      case 'evolve': form = this.evolveForm; break;
      case 'career': form = this.careerForm; break;
      default: return;
    }

    if (form.valid) {
      // Simulation d'envoi
      setTimeout(() => {
        console.log(`Form ${formType} submitted:`, form.value);
        this.isSubmitting.set(false);
        // Ici, vous ajouteriez l'appel à votre service d'envoi d'email
        alert('Formulaire envoyé avec succès !');
        form.reset();
      }, 2000);
    } else {
      this.isSubmitting.set(false);
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }
}