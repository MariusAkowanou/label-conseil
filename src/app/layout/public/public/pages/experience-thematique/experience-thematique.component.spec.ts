import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceThematiqueComponent } from './experience-thematique.component';

describe('ExperienceThematiqueComponent', () => {
  let component: ExperienceThematiqueComponent;
  let fixture: ComponentFixture<ExperienceThematiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceThematiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperienceThematiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
