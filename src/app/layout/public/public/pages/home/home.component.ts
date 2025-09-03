import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../../../shared/services/local/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private seo = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  // Animation states
  isVisible = signal({
    hero: false,
    services: false,
    methodology: false,
    expertise: false,
    cta: false,
    partners: false
  });

  // Données pour les sections
  heroData = {
    subtitle: "Votre expert du",
    mainTitle: "conseil et accompagnement",
    description: "Label Conseil est un cabinet de conseil spécialisé dans l'accompagnement des entreprises et des professionnels vers l'excellence.",
    secondaryDescription: "Depuis plus de 14 ans, Label Conseil accompagne entreprises et candidats dans leur croissance et leur développement professionnel.",
    stats: {
      experience: "10+",
      clients: "500+",
      expertises: "3"
    }
  };

  methodologyData = {
    title: "Le conseil à la hauteur de vos ambitions.",
    sections: [
      {
        id: "methodology",
        title: "Notre méthodologie",
        subtitle: "L'approche directe",
        description: "La précision est le maître-mot d'un conseil réussi. Pour plus de réactivité et d'efficacité, nous sollicitons uniquement les meilleurs experts pour chaque projet.",
        color: "primary"
      },
      {
        id: "organisation",
        title: "Notre organisation",
        subtitle: "L'hyperspécialisation",
        description: "Nos 3 expertises nous permettent de vous proposer un accompagnement sur-mesure par des spécialistes de vos métiers, pour répondre à tous vos enjeux.",
        color: "gray"
      },
      {
        id: "profiles",
        title: "Les profils que nous accompagnons",
        subtitle: "Des projets à fort enjeu",
        description: "Nous accompagnons nos clients sur des projets essentiels à tout niveau de l'organisation, que vous soyez une entreprise du CAC 40, une PME/ETI ou une start-up Tech.",
        color: "gray"
      }
    ]
  };

  expertiseData = {
    title: "Notre secret ? La maîtrise de vos métiers",
    description: "Label Conseil se compose de 3 expertises : Carrière, Consulting et Digital.",
    details: "Cette hyperspécialisation nous permet de maîtriser parfaitement votre environnement, de comprendre vos enjeux, d'appréhender les mutations de vos métiers et d'anticiper les innovations sectorielles. Nos consultants maîtrisent les codes et spécificités de vos marchés.",
    expertises: [
      "Carrière", "Consulting", "Digital", "Data & IA", "Executive", "Finance",
      "Freelance & Transition", "HR", "Investment", "Legal", "Operations & Engineering",
      "Sales", "Tech"
    ]
  };

  ctaData = {
    title: "Prêt à concrétiser vos ambitions ?",
    options: [
      {
        title: "Vous recrutez ?",
        buttonText: "Parlons-en",
        route: "/contact",
        type: "outline"
      },
      {
        title: "Vous souhaitez évoluer ?",
        buttonText: "Trouvez votre expert",
        route: "/expertises",
        type: "filled"
      }
    ]
  };

  partnersData = {
    title: "Ils nous font confiance",
    partners: [
      { name: "Van Cleef & Arpels", logo: "/assets/images/partners/vancleef.png" },
      { name: "Pernod Ricard", logo: "/assets/images/partners/pernod.png" },
      { name: "Monoprix", logo: "/assets/images/partners/monoprix.png" },
      { name: "Eutelsat", logo: "/assets/images/partners/eutelsat.png" },
      { name: "Accenture", logo: "/assets/images/partners/accenture.png" },
      { name: "Safran", logo: "/assets/images/partners/safran.png" },
      { name: "Ubisoft", logo: "/assets/images/partners/ubisoft.png" },
      { name: "ManoMano", logo: "/assets/images/partners/manomano.png" },
      { name: "Essilor", logo: "/assets/images/partners/essilor.png" },
      { name: "Amazon", logo: "/assets/images/partners/amazon.png" },
      { name: "BCG", logo: "/assets/images/partners/bcg.png" }
    ]
  };

  ngOnInit() {
    this.seo.setHomePage();

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
            // Optionnel : arrêter d'observer une fois animé
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px' // Animation plus précoce
      }
    );

    // Observer tous les éléments avec la classe animate-on-scroll
    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }, 100);
  }
}