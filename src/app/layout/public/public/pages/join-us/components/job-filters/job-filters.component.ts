import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-job-filters',
  standalone: true,
  imports: [],
  templateUrl: './job-filters.component.html',
  styleUrl: './job-filters.component.scss'
})
export class JobFiltersComponent {
  @Input() availableCities: any[] = [];
  @Input() availableContractTypes: any[] = [];

  @Output() cityChanged = new EventEmitter<string>();
  @Output() contractChanged = new EventEmitter<string>();
  @Output() searchChanged = new EventEmitter<string>();

  onCityChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.cityChanged.emit(value);
  }

  onContractChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.contractChanged.emit(value);
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchChanged.emit(value);
  }
}