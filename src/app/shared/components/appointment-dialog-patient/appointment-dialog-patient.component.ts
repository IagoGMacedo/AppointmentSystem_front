import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MAT_NATIVE_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { TokenService } from '../../../core/services/token.service';
import { AppointmentService } from '../../../core/services/appointment.service';
import { MatChipsModule } from '@angular/material/chips';
import { NotificationService } from '../../../core/services/notification.service';
import { formatDate } from '@angular/common';
import { Appointment, AppointmentUpdatePatient, StatusMapping } from '../../../core/types/appointmentTypes';
import { AppointmentForm } from '../../../core/types/formTypes';




@Component({
  selector: 'app-appointment-dialog-patient',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './appointment-dialog-patient.component.html',
  styleUrl: './appointment-dialog-patient.component.scss'
})
export class AppointmentDialogPatientComponent {
  readonly dialogRef = inject(MatDialogRef<AppointmentDialogPatientComponent>);
  readonly data = inject<number>(MAT_DIALOG_DATA);

  times: string[] = [];

  editAppointment: Appointment | null = null;


  constructor(
    private formBuilderService: FormBuilder,
    private tokenService: TokenService,
    private appointmentService: AppointmentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.generateTimes();
    if (this.data > 0) {
      this.setAppointmentData(this.data);
    }
  }

  appointmentForm = this.formBuilderService.group({
    date: [new Date(), Validators.required],
    time: ['07:00:00', Validators.required],
  });

  generateTimes() {
    const startHour = 7;
    const endHour = 17;

    for (let hour = startHour; hour <= endHour; hour++) {
      const timeString = hour.toString().padStart(2, '0') + ':00:00';
      this.times.push(timeString);
    }
  }

  cancelAppointment(){
    this.editAppointment!.status = 3;
    this.saveAppointment();
  }

  saveAppointment() {
    if (this.appointmentForm.valid) {
      
      const user = this.tokenService.getLoggedUser();
      if (user) {
          if (this.editAppointment) {
            const appoinment: AppointmentUpdatePatient = {
              appointmentTime: this.appointmentForm.controls.time.value!,
              appointmentDate: this.formatedDate,
              status: this.editAppointment.status
            };
            this.appointmentService.editAppointmentByPatient(this.editAppointment.id, appoinment)
            .subscribe((result)=>{
              this.dialogRef.close(true);
              this.notificationService.showSucess("Agendamento editado com sucesso");
            })
          } else {
            const appoinment: AppointmentForm = {
              userId: Number(user.id),
              appointmentTime: this.appointmentForm.controls.time.value!,
              appointmentDate: this.formatedDate,
            };

            this.appointmentService
              .createAppointment(appoinment)
              .subscribe((result) => {
                this.dialogRef.close(true);
                this.notificationService.showSucess("Agendamento criado com sucesso");
              });
          }

      }

    } else{
    }
  }

  async setAppointmentData(id: number) {
    this.appointmentService.getAppointmentById(id).subscribe((appointment) => {
      if (appointment) {
        this.editAppointment = appointment as Appointment;
        this.appointmentForm.setValue({
          date: new Date(`${appointment.appointmentDate} ${appointment.appointmentTime}`), 
          time: appointment.appointmentTime,
        });
      }
    });
  }

  get formatedDate() : string{
    return formatDate(
      this.appointmentForm.controls.date.value!,
      'yyyy-MM-dd',
      'en-US'
    );
  }

  get StatusString(): string {
    return StatusMapping[this.editAppointment!.status] || '';
  }

  get isEditing(){
    return this.editAppointment && this.editAppointment.status === 1;
  }
}
