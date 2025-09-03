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
            },
            {
                path: 'nous-rejoindre',
                loadComponent: () => import('./layout/public/public/pages/join-us/join-us.component').then(m => m.JoinUsComponent)
            },
            {
                path: 'nous-rejoindre/:id',
                loadComponent: () => import('./layout/public/public/pages/job-detail/job-detail.component').then(m => m.JobDetailComponent)
            },
            {
                path: 'formulaire-de-candidature/:id',
                loadComponent: () => import('./layout/public/public/pages/job-detail/components/job-modal/job-modal.component').then(m => m.JobModalComponent)
            }
        ]
    }
];
