import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExperienceDetail, ExperienceService } from '../../../../../shared/services/api/experience.service';
import { SeoService } from '../../../../../shared/services/local/seo.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-experience-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './experience-detail.component.html',
  styleUrl: './experience-detail.component.css'
})
export class ExperienceDetailComponent implements OnInit {
  private experienceService = inject(ExperienceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seo = inject(SeoService);
  private destroyRef = inject(DestroyRef);

  experience = signal<ExperienceDetail | null>(null);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const slug = params.get('slug');

        if (!slug) {
          this.errorMessage.set("Aucune expérience sélectionnée.");
          this.isLoading.set(false);
          return;
        }

        this.fetchExperience(slug);
      });
  }

  backToExperiences() {
    const thematiqueSlug = this.experience()?.thematique_slug;
    this.router.navigate(['/accompagnements/experience'], {
      queryParams: thematiqueSlug ? { thematique: thematiqueSlug } : undefined
    });
  }

  private fetchExperience(slug: string) {
    this.isLoading.set(true);
    this.experiencesErrorReset();

    this.experienceService.getExperienceDetail(slug)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.experience.set(data);
          this.isLoading.set(false);
          this.updateSeo(data);
        },
        error: (error) => {
          console.error('Erreur lors du chargement du détail expérience :', error);
          this.errorMessage.set("Impossible de récupérer le détail de cette expérience.");
          this.isLoading.set(false);
        }
      });
  }

  private experiencesErrorReset() {
    this.errorMessage.set(null);
  }

  private updateSeo(experience: ExperienceDetail) {
    this.seo.updateSeo({
      title: `${experience.titre} - Expérience Label Conseils`,
      description: experience.description_courte,
      keywords: `${experience.thematique}, ${experience.type_experience}, expérience client`,
      url: `/accompagnements/experience/${experience.slug}`,
      type: 'article'
    });
  }
}
