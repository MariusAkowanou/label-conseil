import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionGeneralComponent } from './condition-general.component';

describe('ConditionGeneralComponent', () => {
  let component: ConditionGeneralComponent;
  let fixture: ComponentFixture<ConditionGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConditionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
