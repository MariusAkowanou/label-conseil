import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/public/public/public.component').then(m => m.PublicComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./layout/public/public/pages/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'qui-sommes-nous',
                loadComponent: () => import('./layout/public/public/pages/about/about.component').then(m => m.AboutComponent)
            },
            {
                path: 'contact',
                loadComponent: () => import('./layout/public/public/pages/contact/contact.component').then(m => m.ContactComponent)
            },
            {
                path: 'expertises/:slug',
                loadComponent: () => import('./layout/public/public/pages/expertise/expertise.component').then(m => m.ExpertiseComponent)
            },
            {
                path: 'accompagnements/experience',
                loadComponent: () => import('./layout/public/public/pages/experience/experience.component').then(m => m.ExperienceComponent)
            }
        ]
    }
];
