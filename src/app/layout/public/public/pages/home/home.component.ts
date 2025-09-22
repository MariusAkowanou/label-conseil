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
      expertises: "16"
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
        description: "Nos expertises nous permettent de vous proposer un accompagnement sur-mesure par des spécialistes de vos métiers, pour répondre à tous vos enjeux.",
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
    description: "Label Conseil se compose de 16 expertises : Carrière, Consulting , Digital ... jusqu'à 16 expertises.",
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
      {name:"Smart Pilote", logo: "/assets/images/partenaire_clients/Smartpilote.jpg"},
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