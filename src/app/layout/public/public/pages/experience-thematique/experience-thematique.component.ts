import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ExperienceService, ExperienceThematique } from '../../../../../shared/services/api/experience.service';
import { SeoService } from '../../../../../shared/services/local/seo.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-experience-thematique',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './experience-thematique.component.html',
  styleUrl: './experience-thematique.component.css'
})
export class ExperienceThematiqueComponent implements OnInit {
  private experienceService = inject(ExperienceService);
  private router = inject(Router);
  private seo = inject(SeoService);
  private destroyRef = inject(DestroyRef);

  thematiques = signal<any>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.updateSeo();
    this.fetchThematiques();
  }

  fetchThematiques() {
    this.isLoading.set(true);
    this.experienceService.getThematiques()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data:any) => {
          this.thematiques.set(data.results);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des thématiques :', error);
          this.errorMessage.set("Impossible de charger les thématiques pour le moment.");
          this.isLoading.set(false);
        }
      });
  }

  openThematique(thematique: any) {
    this.router.navigate(['/accompagnements/experience'], {
      queryParams: { thematique: thematique.slug }
    });
  }

  private updateSeo() {
    this.seo.updateSeo({
      title: "Nos thématiques d'expériences",
      description: "Découvrez les thématiques dans lesquelles Label Conseils intervient et explorez nos retours d'expérience client.",
      keywords: "expériences, thématiques, études de cas, projets clients",
      url: '/accompagnements/experience/thematiques',
      type: 'website'
    });
  }
}
