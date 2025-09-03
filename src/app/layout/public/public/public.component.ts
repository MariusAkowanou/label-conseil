import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { CookieBannerComponent } from '../../../shared/components/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CookieBannerComponent
  ],

  templateUrl: './public.component.html',
  styleUrl: './public.component.scss'
})
export class PublicComponent {
  
}
