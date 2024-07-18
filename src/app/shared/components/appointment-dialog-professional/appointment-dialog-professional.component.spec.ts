import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDialogProfessionalComponent } from './appointment-dialog-professional.component';

describe('AppointmentDialogProfessionalComponent', () => {
  let component: AppointmentDialogProfessionalComponent;
  let fixture: ComponentFixture<AppointmentDialogProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentDialogProfessionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentDialogProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
