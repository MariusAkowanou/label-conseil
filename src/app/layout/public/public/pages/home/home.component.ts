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
    description: "LABEL CONSEILS est un cabinet de conseil spécialisé dans l'accompagnement des entreprise et des professionnels vers l'excellence.",
    secondaryDescription: "Depuis 2011, LABEL CONSEILS accompagne entreprises et candidats dans leur croissance et leur développement professionnel.",
    stats: {
      experience: "10+",
      clients: "500+",
      expertises: "4"
    }
  };

  methodologyData = {
    title: "Le conseil à la hauteur de vos ambitions.",
    sections: [
      {
        id: "methodology",
        title: "Notre méthodologie",
        subtitle: "Une approche structurée pour un impact durable",
        description: "Chez LABEL CONSEILS, nous croyons que le succès d’une mission repose sur une méthodologie rigoureuse, adaptative et collaborative.Notre démarche est conçue pour garantir non seulement la livraison de résultats concrets, mais aussi le renforcement durable des capacités de nos clients.",
        color: "primary"
      },
      {
        id: "organisation",
        title: "Notre organisation",
        subtitle: "Une force collective au service de votre performance",
        description: "LABEL CONSEILS s'appuie sur une organisation robuste et agile, conçue pour mobiliser rapidement l'expertise idoine autour de vos défis.Notre structure et notre culture font de nous un partenaire de confiance pour les projets les plus exigeants.",
        color: "gray"
      },
      {
        id: "profiles",
        title: "Les profils que nous accompagnons",
        subtitle: "Votre défi est unique, notre approche aussi.",
        description: "LABEL CONSEILS est le partenaire privilégié des acteurs qui impulsent le développement et la transformation.Nous adaptons nos méthodes et notre accompagnement à la spécificité de chaque structure, de l'institution internationale à la collectivité locale.",
        color: "gray"
      },
      {
        id: "reseau",
        title: "Notre Réseau & Partenariats",
        subtitle: "Un réseau et des partenaires à votre service.",
        description: "Pour répondre à des mandats complexes ou hautement spécialisés, LABEL CONSEILS peut s'appuyer sur un réseau étendu d'experts associés et de partenaires stratégiques nationaux et internationaux.Cette flexibilité nous permet d'enrichir nos équipes des compétences les plus pointues, sans compromis sur la qualité.",
        color: "gray"
      }
    ]
  };

  expertiseData = {
    title: "Notre secret ? La maîtrise de vos métiers",
    description: "Parce que comprendre votre réalité terrain est la clé de votre performance.Chez LABEL CONSEILS, nous ne nous contentons pas de livrer des analyses théoriques.Nous plongeons au cœur de vos enjeux opérationnels, de vos contraintes spécifiques et de votre jargon métier pour co- construire des solutions qui ne sont pas seulement justes sur le papier, mais surtout efficaces sur le terrain.",
    details: "Nous ne visons pas la livraison d'un simple rapport. Nous visons votre succès opérationnel.Cette philosophie nous pousse à être un partenaire engagé à vos côtés, qui partage vos objectifs et met son expertise au service de votre performance métier.",
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
      
    ]
  };

  partnersData = {
    title: "Ils nous font confiance",
    partners: [
      { name: "Smart Pilote", logo: "/assets/images/partenaire_clients/Smartpilote.jpg" },
      { name: "ACAD", logo: "/assets/images/partenaire_clients/ACAD.png" },
      { name: "Access", logo: "/assets/images/partenaire_clients/Access.jpg" },
      { name: "ADECOB", logo: "/assets/images/partenaire_clients/ADECOB.png" },
      { name: "ADJARA", logo: "/assets/images/partenaire_clients/ADJARA.jpg" },
      { name: "ADJOHOUN", logo: "/assets/images/partenaire_clients/ADJOHOUN.jpg" },
      { name: "AGORA", logo: "/assets/images/partenaire_clients/AGORA.png" },
      { name: "AGR GROUP", logo: "/assets/images/partenaire_clients/AGRGROUP.png" },
      { name: "AJE", logo: "/assets/images/partenaire_clients/AJE.png" },
      { name: "Algeth.fr", logo: "/assets/images/partenaire_clients/Algeth.fr.png" },
      { name: "Allada", logo: "/assets/images/partenaire_clients/allada.jpg" },
      { name: "ANAT", logo: "/assets/images/partenaire_clients/ANAT.png" },
      { name: "ANCB", logo: "/assets/images/partenaire_clients/ANCB.jpg" },
      { name: "APB", logo: "/assets/images/partenaire_clients/APB.png" },
      { name: "APIDA", logo: "/assets/images/partenaire_clients/APIDA.webp" },
      { name: "ASB AGRO", logo: "/assets/images/partenaire_clients/ASBAGRO.png" },
      { name: "ASB CONSULTING", logo: "/assets/images/partenaire_clients/ASBCONSULTING.png" },
      { name: "Avrankou", logo: "/assets/images/partenaire_clients/avrankou.jpg" },
      { name: "BENINCAJU", logo: "/assets/images/partenaire_clients/BENINCAJU.png" },
      { name: "Bohicon", logo: "/assets/images/partenaire_clients/Bohicon.jpg" },
      { name: "BOPA", logo: "/assets/images/partenaire_clients/BOPA.jpg" },
      { name: "CAN", logo: "/assets/images/partenaire_clients/CAN.jpg" },
      { name: "CBM", logo: "/assets/images/partenaire_clients/CBM.jpg" },
      { name: "CCIB", logo: "/assets/images/partenaire_clients/CCIB.png" },
      { name: "Cobly", logo: "/assets/images/partenaire_clients/Cobly.jpg" },
      { name: "CONAFIL", logo: "/assets/images/partenaire_clients/CONAFIL.jpg" },
      { name: "COOPERATION SUISSE", logo: "/assets/images/partenaire_clients/COOPERATIONSUISSE.png" },
      { name: "Copargo", logo: "/assets/images/partenaire_clients/copargo.jpg" },
      { name: "COUR SUPREME", logo: "/assets/images/partenaire_clients/COURSUPREME.png" },
      { name: "COVE", logo: "/assets/images/partenaire_clients/COVE.png" },
      { name: "DGB", logo: "/assets/images/partenaire_clients/DGB.png" },
      { name: "DGI", logo: "/assets/images/partenaire_clients/DGI.png" },
      { name: "DIOCESE DE PARAKOU", logo: "/assets/images/partenaire_clients/DIOCESEDEPARAKOU.jpg" },
      { name: "DJIDJA", logo: "/assets/images/partenaire_clients/DJIDJA.png" },
      { name: "DOKOUNDJI", logo: "/assets/images/partenaire_clients/DOKOUNDJI.png" },
      { name: "DORSCH IMPACT", logo: "/assets/images/partenaire_clients/DORSCHIMPACT.png" },
      { name: "EnDev", logo: "/assets/images/partenaire_clients/EnDev.png" },
      { name: "EOTAS", logo: "/assets/images/partenaire_clients/EOTAS.png" },
      { name: "GIEDAF", logo: "/assets/images/partenaire_clients/GIEDAF.png" },
      { name: "GIZ BENIN", logo: "/assets/images/partenaire_clients/GIZBENIN.png" },
      { name: "GIZ TOGO", logo: "/assets/images/partenaire_clients/GIZTOGO.jpg" },
      { name: "Glazoué", logo: "/assets/images/partenaire_clients/glazoue.jpg" },
      { name: "Gogounou", logo: "/assets/images/partenaire_clients/gogounou.jpg" },
      { name: "Grand-Popo", logo: "/assets/images/partenaire_clients/grand-popo.jpg" },
      { name: "Ifangni", logo: "/assets/images/partenaire_clients/ifangni.jpg" },
      { name: "Karimama", logo: "/assets/images/partenaire_clients/karimama.jpg" },
      { name: "Kpomassè", logo: "/assets/images/partenaire_clients/kpomasse.jpg" },
      { name: "MAEC", logo: "/assets/images/partenaire_clients/MAEC.png" },
      { name: "MASM", logo: "/assets/images/partenaire_clients/MASM.png" },
      { name: "MDC", logo: "/assets/images/partenaire_clients/MDC.png" },
      { name: "MDGL", logo: "/assets/images/partenaire_clients/MDGL.png" },
      { name: "MEF", logo: "/assets/images/partenaire_clients/MEF.png" },
      { name: "Megnon Consulting", logo: "/assets/images/partenaire_clients/MegnonConsulting.png" },
      { name: "MIC", logo: "/assets/images/partenaire_clients/MIC.png" },
      { name: "MPME", logo: "/assets/images/partenaire_clients/MPME.png" },
      { name: "MSP", logo: "/assets/images/partenaire_clients/MSP.jpg" },
      { name: "Natitingou", logo: "/assets/images/partenaire_clients/natitingou.jpg" },
      { name: "OUAKE", logo: "/assets/images/partenaire_clients/OUAKE.jpg" },
      { name: "OUINHI", logo: "/assets/images/partenaire_clients/OUINHI.png" },
      { name: "PADA", logo: "/assets/images/partenaire_clients/PADA.jpg" },
      { name: "PAGIPG", logo: "/assets/images/partenaire_clients/PAGIPG.png" },
      { name: "Parakou", logo: "/assets/images/partenaire_clients/parakou.jpg" },
      { name: "PDIEM", logo: "/assets/images/partenaire_clients/PDIEM.png" },
      { name: "PNUD", logo: "/assets/images/partenaire_clients/PNUD.jpg" },
      { name: "ProDIJ", logo: "/assets/images/partenaire_clients/ProDIJ.png" },
      { name: "ProSilience", logo: "/assets/images/partenaire_clients/ProSilience.png" },
      { name: "ProSol", logo: "/assets/images/partenaire_clients/ProSol.png" },
      { name: "PSOTA", logo: "/assets/images/partenaire_clients/PSOTA.png" },
      { name: "ReFORME", logo: "/assets/images/partenaire_clients/ReFORME.png" },
      { name: "Savalou", logo: "/assets/images/partenaire_clients/savalou.jpg" },
      { name: "SG CONSULTING", logo: "/assets/images/partenaire_clients/SGCONSULTING.png" },
      { name: "SNV", logo: "/assets/images/partenaire_clients/SNV.png" },
      { name: "Sô Ava", logo: "/assets/images/partenaire_clients/SôAva.jpg" },
      { name: "SOS CIVISME", logo: "/assets/images/partenaire_clients/SOSCIVISME.jpeg" },
      { name: "SWEDD", logo: "/assets/images/partenaire_clients/SWEDD.png" },
      { name: "Tanguiéta", logo: "/assets/images/partenaire_clients/Tanguiéta.png" },
      { name: "Tchaourou", logo: "/assets/images/partenaire_clients/tchaourou.jpg" },
      { name: "TECHNOSERVE", logo: "/assets/images/partenaire_clients/TECHNOSERVE.png" },
      { name: "Toffo", logo: "/assets/images/partenaire_clients/toffo.jpg" },
      { name: "TOUCOUNTOUNA", logo: "/assets/images/partenaire_clients/TOUCOUNTOUNA.jpg" },
      { name: "Toviklin", logo: "/assets/images/partenaire_clients/toviklin.jpg" },
      { name: "TRANFORME", logo: "/assets/images/partenaire_clients/TRANFORME.png" },
      { name: "TRESOR PUBLIC", logo: "/assets/images/partenaire_clients/TRESORPUBLIC.jpg" },
      { name: "UEMOA", logo: "/assets/images/partenaire_clients/UEMOA.png" },
      { name: "UGR", logo: "/assets/images/partenaire_clients/UGR.jpg" },
      { name: "UNA", logo: "/assets/images/partenaire_clients/UNA.jpg" },
      { name: "US INFORMATIQUE", logo: "/assets/images/partenaire_clients/USINFORMATIQUE.png" },
      { name: "VNG", logo: "/assets/images/partenaire_clients/VNG.jpg" },
      { name: "ZIO1", logo: "/assets/images/partenaire_clients/ZIO1.png" },
      { name: "Zogbodomey", logo: "/assets/images/partenaire_clients/zogbodomey.jpg" }
    ]
  };

  // Variables pour le carousel des partenaires
  currentPartnerIndex = 0;
  partnerGroups: any[] = [];
  partnersPerSlide = 8; // Nombre de logos par slide

  ngOnInit() {
    this.seo.setHomePage();
    this.initializePartnerCarousel();

    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollAnimations();
    }
  }

  private initializePartnerCarousel() {
    // Diviser les partenaires en groupes pour le carousel
    this.partnerGroups = [];
    for (let i = 0; i < this.partnersData.partners.length; i += this.partnersPerSlide) {
      this.partnerGroups.push(this.partnersData.partners.slice(i, i + this.partnersPerSlide));
    }
  }

  nextPartners() {
    this.currentPartnerIndex = (this.currentPartnerIndex + 1) % this.partnerGroups.length;
  }

  previousPartners() {
    this.currentPartnerIndex = this.currentPartnerIndex === 0
      ? this.partnerGroups.length - 1
      : this.currentPartnerIndex - 1;
  }

  goToPartnerSlide(index: number) {
    this.currentPartnerIndex = index;
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