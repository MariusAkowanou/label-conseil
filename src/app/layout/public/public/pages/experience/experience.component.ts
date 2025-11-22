import { Component, OnInit, inject, signal, PLATFORM_ID, DestroyRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SeoService } from '../../../../../shared/services/local/seo.service';
import { ExperienceService } from '../../../../../shared/services/api/experience.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);
  private experienceService = inject(ExperienceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // Données de la page
  heroData = {
    tagline: "LABEL CONSEILS : EXCELLENCE MATTERS",
    title: "L'expérience Label Conseils",
    description: "Sur un marché du conseils encore dominé par les grands acteurs généralistes, Label Conseil propose une alternative résolument différente à la structure agile et aux processus centrés sur l'expertise, l'excellence, l'humain et la dimension conseils."
  };

  cardsData = {
    title: "Nos expériences",
    subtitle: "Des missions réussies qui témoignent de notre expertise",
    cards: [
      {
        image: "/assets/images/hero.png",
        title: "Transformation digitale",
        description: "Accompagnement d'une PME du secteur industriel dans sa transformation digitale : recrutement de 15 profils IT spécialisés, mise en place d'une équipe data science et intégration réussie de nouveaux talents."
      },
      {
        image: "/assets/images/hero.png",
        title: "Expansion internationale",
        description: "Mission de recrutement pour l'ouverture d'une filiale européenne : identification et recrutement de 8 dirigeants locaux, création d'une équipe commerciale internationale et accompagnement sur 18 mois."
      },
      {
        image: "/assets/images/hero.png",
        title: "Restructuration stratégique",
        description: "Conseil en recrutement pour une restructuration majeure : recrutement de 25 cadres dirigeants, accompagnement des équipes existantes et mise en place d'une nouvelle organisation opérationnelle."
      }
    ]
  };

  processData = {
    title: "Co-construire la mission avec vous",
    subtitle: "Stratégie de recherche co-construite, confidentialité assurée, reportings fréquents : nous vous proposons une approche méthodique et sur-mesure pour chacune de nos missions, vous assurant une expérience client inégalée.",
    phases: [
      {
        number: "01",
        title: "La phase préparatoire",
        icon: "fas fa-clipboard-list",
        description: "Lors d'une première rencontre, nous élaborons ensemble un cahier des charges reprenant à la fois les spécificités de votre organisation (identité, culture, organisation, contexte...) et les caractéristiques candidats (savoir-faire et savoir-être) qui en découlent. Nous évaluons également le niveau de confidentialité du poste et son adéquation au marché pour en repréciser les contours.",
        continuationText: "Nos reportings exhaustifs vous permettent de suivre les candidats en process et contactés. Nos discussions fréquentes font avancer la mission : suivi candidats, prise de références à effectuer, élargissement éventuel du périmètre de chasse, amélioration de notre collaboration, etc."
      },
      {
        number: "02",
        title: "La recherche et sélection",
        icon: "fas fa-search-plus",
        description: "Grâce à notre expertise sectorielle et notre réseau de spécialistes, nous identifions les profils les plus pertinents. Notre approche directe nous permet d'évaluer finement les compétences techniques et comportementales de chaque candidat.",
        continuationText: ""
      },
      {
        number: "03",
        title: "Évaluation et présentation",
        icon: "fas fa-user-check",
        description: "Sur demande, nous conduisons une prestation d'évaluation qui permet d'évaluer les compétences globales d'un candidat. Cet outil permet de mesurer ses motivations, ses freins et ses appétences pour mieux anticiper sa réussite dans le poste et l'entreprise.",
        continuationText: ""
      },
      {
        number: "04",
        title: "La fin de mission",
        icon: "fas fa-file-contract",
        description: "Notre position d'intermédiaire facilite les négociations avec les candidats retenus. Nous réalisons un rapport complet à l'issue de la mission si vous souhaitez obtenir des données précises sur votre image de marque, les salaires pratiqués, les retours des candidats en process...",
        continuationText: ""
      }
    ]
  };

  commitmentsData = {
    title: "Nos engagements  :",
    commitments: [
      {
        title: "Déontologie et satisfaction",
        description: "Confidentialité, transparence, suivi rigoureux et coaching pendant les process. Nous sommes attentifs à vos retours et contrôlons la satisfaction de tous les candidats rencontrés."
      },
      {
        title: "Des opportunités adaptées",
        description: "Nous garantissons des prises de contact à bon escient. Nous travaillons pour des clients variés et pour les plus belles références, nous permettant de vous proposer des postes hors des radars tout au long de votre carrière."
      },
      {
        title: "Accélérer votre parcours",
        description: "Nous suivons des centaines de parcours et partageons cette connaissance avec les candidats (personal branding, perspectives, salaires, mises en relation...) pour les aider à atteindre plus vite leur plein potentiel."
      }
    ]
  };

  partnershipData = {
    title: "Un interlocuteur durable pour votre carrière",
    description: "L'accompagnement des talents est au cœur de notre ADN depuis notre création, faisant de Label Conseils l'un des premiers cabinets de conseils à intégrer l'expérience candidats à son modèle de développement.",
    commitment: "Pour aider les candidats à révéler tout leur potentiel, nous cultivons avec eux une relation de proximité basée sur notre compréhension de leur métier et un accompagnement quotidien. En cas d'opportunité en adéquation avec votre profil, nous vous aidons à réussir les process et suivons votre prise de poste même après la période d'intégration."
  };

  thematique = signal<any>(null);
  missions = signal<any[]>([]);
  isLoadingExperiences = signal<boolean>(false);
  experiencesError = signal<string | null>(null);
  selectedThematique = signal<string | null>(null);
  selectedType = signal<string>('all');

  ngOnInit() {
    this.seo.updateSeo({
      title: "L'expérience Label Conseils - Notre approche unique",
      description: "Découvrez notre approche méthodique et sur-mesure : de la phase préparatoire au suivi post-intégration, une expérience client et candidat inégalée.",
      keywords: "expérience label conseils, méthodologie, accompagnement, process recrutement",
      url: "/experience"
    });

    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimations();
    }

    this.watchFilters();
  }

  watchFilters() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const thematique = params.get('thematique');

        this.selectedThematique.set(thematique);

        this.fetchExperiences();
      });
  }

  onTypeChange(value: string) {
    const queryParams: any = {};
    const thematique = this.selectedThematique();

    if (thematique) {
      queryParams['thematique'] = thematique;
    }

    if (value && value !== 'all') {
      queryParams['type'] = value;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
  }

  clearThematique() {
    const currentType = this.selectedType();
    const queryParams: any = {};

    if (currentType && currentType !== 'all') {
      queryParams['type'] = currentType;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
  }


  private fetchExperiences() {
    this.isLoadingExperiences.set(true);
    this.experiencesError.set(null);

    const thematiqueSlug = this.selectedThematique();
    if (!thematiqueSlug) {
      this.missions.set([]);
      this.thematique.set(null);
      this.isLoadingExperiences.set(false);
      return;
    }

    this.experienceService.getExperiences(thematiqueSlug).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: any) => {
          this.thematique.set(data);
          this.missions.set(data.missions || []);
          this.isLoadingExperiences.set(false);
        },
        error: (error) => {
          console.error('Erreur lors du chargement des expériences :', error);
          this.experiencesError.set("Impossible de charger les expériences pour le moment.");
          this.isLoadingExperiences.set(false);
        }
      });
  }

  private setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px 0px -50px 0px' }
    );

    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }, 100);
  }
}