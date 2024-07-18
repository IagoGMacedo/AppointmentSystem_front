import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDialogPatientComponent } from './appointment-dialog-patient.component';

describe('AppointmentDialogPatientComponent', () => {
  let component: AppointmentDialogPatientComponent;
  let fixture: ComponentFixture<AppointmentDialogPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentDialogPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentDialogPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
