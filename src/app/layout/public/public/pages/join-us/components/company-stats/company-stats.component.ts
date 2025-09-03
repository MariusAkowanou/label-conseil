import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-company-stats',
  standalone: true,
  imports: [],
  templateUrl: './company-stats.component.html',
  styleUrl: './company-stats.component.scss'
})
export class CompanyStatsComponent {
  @Input() company!: any;

}
