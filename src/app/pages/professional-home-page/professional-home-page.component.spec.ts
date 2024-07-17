import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalHomePageComponent } from './professional-home-page.component';

describe('ProfessionalHomePageComponent', () => {
  let component: ProfessionalHomePageComponent;
  let fixture: ComponentFixture<ProfessionalHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessionalHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
