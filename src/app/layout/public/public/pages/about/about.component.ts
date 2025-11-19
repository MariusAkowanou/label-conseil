import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../../shared/services/local/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  // Animation states
  isVisible = signal({
    hero: false,
    story: false,
    values: false,
    team: false
  });

  // Données de la page - MISES À JOUR selon les vraies données Label Conseil
  heroData = {
    company: "LABEL CONSEILS",
    title: "Qui sommes-nous ?",
    mainDescription: "Nous sommes un cabinet spécialisé dans la conception, la mise en œuvre et la gestion intégrée de projets de développement, alliant expertise technique, innovation et ancrage territorial.Notre mission est d’accompagner les institutions publiques, les organisations de développement, les ONG, les entreprises et les acteurs communautaires dans la réalisation de solutions durables, structurantes et adaptées aux réalités locales..",
    secondaryDescription: "Pour réfléchir, décider et agir efficacement, l'expertise pure ne suffit plus : il devient nécessaire de considérer les interrelations de plusieurs secteurs d'activités, de plusieurs fonctions, de plusieurs cultures."
  };

  // Données pour la section "Pourquoi Label Conseil"
  whyData = {
    introduction: "Appuyer à répondre efficacement à ces nouveaux besoins, requiert de nouvelles approches. Les méthodes et analyses classiques peuvent s'avérer inappropriées. Il urge donc d'innover, se différencier et se doter de la flexibilité nécessaire pour orienter efficacement les décisions des partenaires.",
    singularityTitle: "La singularité et la renommée du cabinet se fondent sur la combinaison inédite :",
    points: [
      {
        title: "Expertise reconnue",
        description: "des problématiques des collectivités locales et de l'État, des politiques publiques nationales et sous-régionales consacrées à leur développement"
      },
      {
        title: "Solide expérience",
        description: "dans la conception, la déclinaison opérationnelle et la mise en œuvre de stratégies de développement économique et des infrastructures"
      },
      {
        title: "Capacité éprouvée",
        description: "à optimiser et moderniser les organisations publiques et privées placées dans un contexte de décentralisation"
      }
    ],
    networkNote: "Nous associons à nos compétences un réseau de consultants et d'experts."
  };

  // Raisons de nous choisir
  reasonsData = {
    title: "LES RAISONS POUR NOUS CHOISIR",
    subtitle: "Pour chaque situation, LABEL CONSEILS identifie les experts et les méthodes les mieux à même d'aider à concevoir et mettre en œuvre la stratégie du partenaire.",
    intro: "LABEL CONSEILS propose une assistance personnalisée en trois volets, pour :",
    approaches: [
      {
        title: "Approche sur mesure et participative",
        description: "fondée sur une maîtrise des techniques de conseils, une expertise dans la résolution de problèmes complexes transdisciplinaires, et un réel investissement en R&D (stratégie, management, design thinking, innovation collaborative...), en lien avec le monde académique"
      },
      {
        title: "Cabinet de conseils indépendant",
        description: "sans conflit d'intérêt : un allié qui, au-delà des recommandations, s'implique à vos côtés jusqu'à la réussite de vos ambitions"
      },
      {
        title: "Application systématique de la qualité totale",
        description: "dans la gestion de chaque projet, étude, conseils et formation"
      }
    ],
    commitments: [
      "Nous comprenons rapidement votre problématique et vos attentes",
      "Nous vous proposons une offre rapidement avec un tarif calculé au plus juste",
      "Nous prenons en charge votre étude en nous intégrant à votre équipe",
      "Nous vous transmettons les résultats et les moyens de poursuivre le plan d'action"
    ]
  };

  ngOnInit() {
    this.seo.setAboutPage();

    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimations();
    }
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