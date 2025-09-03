import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface SeoData {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'service';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
}

@Injectable({
    providedIn: 'root'
})
export class SeoService {
    private title = inject(Title);
    private meta = inject(Meta);
    private router = inject(Router);
    private platformId = inject(PLATFORM_ID);

    // Données par défaut
    private defaultSeo: SeoData = {
        title: 'Label Conseils - Conseils et Expertise',
        description: 'Label Conseils vous accompagne dans vos projets avec expertise et professionnalisme. Découvrez nos services de conseil personnalisés.',
        keywords: 'conseils, expertise, label conseils, consulting, accompagnement',
        image: '/assets/images/og-default.jpg',
        type: 'website',
        author: 'Label Conseils'
    };

    constructor() {
        // Écouter les changements de route pour mettre à jour l'URL canonical
        this.router.events.pipe(
            filter((event): event is NavigationEnd => event instanceof NavigationEnd)
        ).subscribe((event) => {
            this.updateCanonicalUrl(event.urlAfterRedirects);
        });
    }

    updateSeo(seoData: Partial<SeoData>) {
        const data: SeoData = { ...this.defaultSeo, ...seoData };

        // Titre de la page
        this.updateTitle(data.title!);

        // Meta description
        this.updateMetaTag('description', data.description!);

        // Meta keywords
        if (data.keywords) {
            this.updateMetaTag('keywords', data.keywords);
        }

        // Meta robots
        this.updateMetaTag('robots', 'index, follow');

        // Meta author
        if (data.author) {
            this.updateMetaTag('author', data.author);
        }

        // Open Graph
        this.updateOpenGraph(data);

        // Twitter Cards
        this.updateTwitterCards(data);

        // JSON-LD structured data
        this.updateStructuredData(data);
    }

    private updateTitle(title: string) {
        this.title.setTitle(title);
        this.updateMetaTag('property', 'og:title', title);
        this.updateMetaTag('name', 'twitter:title', title);
    }

    private updateMetaTag(attribute: string, key: string, content?: string): void;
    private updateMetaTag(key: string, content: string): void;
    private updateMetaTag(attributeOrKey: string, keyOrContent: string, content?: string) {
        if (content !== undefined) {
            // Forme: updateMetaTag('property', 'og:title', content)
            const selector = `${attributeOrKey}="${keyOrContent}"`;
            if (this.meta.getTag(selector)) {
                this.meta.updateTag({ [attributeOrKey]: keyOrContent, content });
            } else {
                this.meta.addTag({ [attributeOrKey]: keyOrContent, content });
            }
        } else {
            // Forme: updateMetaTag('description', content)
            const key = attributeOrKey;
            const contentValue = keyOrContent;
            if (this.meta.getTag(`name="${key}"`)) {
                this.meta.updateTag({ name: key, content: contentValue });
            } else {
                this.meta.addTag({ name: key, content: contentValue });
            }
        }
    }

    private updateOpenGraph(data: SeoData) {
        const baseUrl = 'https://www.label-conseils.com';

        this.updateMetaTag('property', 'og:title', data.title!);
        this.updateMetaTag('property', 'og:description', data.description!);
        this.updateMetaTag('property', 'og:type', data.type!);
        this.updateMetaTag('property', 'og:url', data.url ? `${baseUrl}${data.url}` : baseUrl);
        this.updateMetaTag('property', 'og:site_name', 'Label Conseils   ');
        this.updateMetaTag('property', 'og:locale', 'fr_FR');

        if (data.image) {
            const imageUrl = data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`;
            this.updateMetaTag('property', 'og:image', imageUrl);
            this.updateMetaTag('property', 'og:image:width', '1200');
            this.updateMetaTag('property', 'og:image:height', '630');
            this.updateMetaTag('property', 'og:image:alt', data.title!);
        }

        if (data.publishedTime) {
            this.updateMetaTag('property', 'article:published_time', data.publishedTime);
        }

        if (data.modifiedTime) {
            this.updateMetaTag('property', 'article:modified_time', data.modifiedTime);
        }
    }

    private updateTwitterCards(data: SeoData) {
        this.updateMetaTag('name', 'twitter:card', 'summary_large_image');
        this.updateMetaTag('name', 'twitter:title', data.title!);
        this.updateMetaTag('name', 'twitter:description', data.description!);
        this.updateMetaTag('name', 'twitter:site', '@labelconseil');
        this.updateMetaTag('name', 'twitter:creator', '@labelconseil');

        if (data.image) {
            const baseUrl = 'https://www.label-conseils.com';
            const imageUrl = data.image.startsWith('http') ? data.image : `${baseUrl}${data.image}`;
            this.updateMetaTag('name', 'twitter:image', imageUrl);
        }
    }

    private updateCanonicalUrl(url: string) {
        if (!isPlatformBrowser(this.platformId)) {
            return; // Ne rien faire côté serveur
        }

        const baseUrl = 'https://www.label-conseils.com';
        const canonicalUrl = `${baseUrl}${url}`;

        // Supprimer l'ancien lien canonical s'il existe
        const existingCanonical = document.querySelector('link[rel="canonical"]');
        if (existingCanonical) {
            existingCanonical.remove();
        }

        // Ajouter le nouveau lien canonical
        const link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', canonicalUrl);
        document.head.appendChild(link);
    }

    private updateStructuredData(data: SeoData) {
        if (!isPlatformBrowser(this.platformId)) {
            return; // Ne rien faire côté serveur
        }

        // Supprimer l'ancien script JSON-LD s'il existe
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }

        // Créer les données structurées
        const structuredData = {
            "@context": "https://schema.org",
            "@type": data.type === 'article' ? "Article" : "Organization",
            "name": data.title,
            "description": data.description,
            ...(data.type === 'website' && {
                "url": "https://www.label-conseils.com",
                "logo": "https://www.label-conseils.com/assets/images/logo.png",
                "sameAs": [
                    "https://linkedin.com/company/label-conseils",
                    "https://facebook.com/labelconseils",
                    "https://twitter.com/labelconseils"
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+229 XX XX XX XX",
                    "contactType": "customer service",
                    "email": "support@nexacorp.bj"
                }
            }),
            ...(data.type === 'article' && {
                "headline": data.title,
                "author": {
                    "@type": "Organization",
                    "name": data.author || "Label Conseils"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Label Conseil",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://www.label-conseil.com/assets/images/logo.png"
                    }
                },
                "datePublished": data.publishedTime,
                "dateModified": data.modifiedTime || data.publishedTime
            })
        };

        // Ajouter le nouveau script JSON-LD
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    // Méthodes utilitaires pour les pages communes
    setHomePage() {
        this.updateSeo({
            title: 'Label Conseils - Expertise et Conseils Professionnels',
            description: 'Découvrez Label Conseils, votre partenaire de confiance pour tous vos besoins en conseil et expertise. Solutions personnalisées et accompagnement professionnel.',
            keywords: 'label conseils, conseils professionnels, expertise, consulting, accompagnement entreprise',
            url: '/'
        });
    }

    setContactPage() {
        this.updateSeo({
            title: 'Contact - Label Conseils',
            description: 'Contactez Label Conseil pour discuter de vos projets. Notre équipe d\'experts est à votre écoute pour vous accompagner.',
            keywords: 'contact label conseil, devis, consultation, expertise conseil',
            url: '/contact'
        });
    }

    setServicesPage() {
        this.updateSeo({
            title: 'Nos Services - Label Conseils',
            description: 'Découvrez la gamme complète des services de Label Conseil. Expertise, conseil stratégique et accompagnement personnalisé.',
            keywords: 'services conseil, expertise professionnelle, conseil stratégique, accompagnement',
            url: '/services'
        });
    }

    setAboutPage() {
        this.updateSeo({
            title: 'À Propos - Label Conseils',
            description: 'Découvrez Label Conseils, notre histoire, nos valeurs et notre équipe d\'experts dédiés à votre réussite.',
            keywords: 'à propos label conseil, équipe, histoire, valeurs, expertise',
            url: '/about'
        });
    }
}