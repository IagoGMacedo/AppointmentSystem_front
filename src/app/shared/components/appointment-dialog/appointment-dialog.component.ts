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
  MAT_NATIVE_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { TokenService } from '../../../core/services/token.service';
import { AppointmentService } from '../../../core/services/appointment.service';
import { Appointment, AppointmentForm, AppointmentUpdate } from '../../../core/types/userTypes';
import { MatChipsModule } from '@angular/material/chips';

export interface DialogData {
  title: string;
  id: number;
}

@Component({
  selector: 'app-appointment-dialog',
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
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './appointment-dialog.component.html',
  styleUrl: './appointment-dialog.component.scss',
})
export class AppointmentDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AppointmentDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  times: string[] = [];

  editAppointment: Appointment | null = null;

  constructor(
    private formBuilderService: FormBuilder,
    private tokenService: TokenService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.generateTimes();
    if (this.data.id > 0) {
      this.setAppointmentData(this.data.id);
    }
  }

  appointmentForm = this.formBuilderService.group({
    date: [new Date(), Validators.required],
    time: ['07:00:00', Validators.required],
    status: ['1']
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
    console.log("entrei no cancel appointment");
    this.appointmentForm.controls.status.setValue('3');
    this.saveAppointment();
  }

  saveAppointment() {
    if (this.appointmentForm.valid) {
      console.log("entrei no save appointment");
      //chamar o service aqui
      this.tokenService.loggedUser.subscribe((user) => {
        if (user) {
          console.log('entrei no user');
          const dateControlValue = this.appointmentForm.controls.date.value;
          if (dateControlValue) {
            const formattedDate = dateControlValue.toISOString().split('T')[0];

            

            if (this.editAppointment) {
              console.log("vou editar");
              const appoinment: AppointmentUpdate = {
                appointmentTime: this.appointmentForm.controls.time.value!,
                appointmentDate: formattedDate,
                status: Number(this.appointmentForm.controls.status.value!)
              };
              this.appointmentService.editAppointment(this.editAppointment.id, appoinment)
              .subscribe((result)=>{
                this.dialogRef.close();
              })
            } else {
              const appoinment: AppointmentForm = {
                userId: Number(user.id),
                appointmentTime: this.appointmentForm.controls.time.value!,
                appointmentDate: formattedDate,
              };


              this.appointmentService
                .createAppointment(appoinment)
                .subscribe((result) => {
                  this.dialogRef.close();
                });
            }

          }
        }
      });
    }
  }

  setAppointmentData(id: number) {
    this.appointmentService.getAppointmentById(id).subscribe((appointment) => {
      if (appointment) {
        this.editAppointment = appointment as Appointment;
        this.appointmentForm.setValue({
          date: new Date(appointment.appointmentDate), // Convert string to Date
          time: appointment.appointmentTime,
          status: appointment.status.toString()
        });
      }
    });
  }

  getStatusString(idStatus: number): string {
    switch (idStatus) {
      case 1:
        return 'AGENDADO';
        break;
      case 2:
        return 'CONCLUIDO';
        break;
      case 3:
        return 'CANCELADO';
        break;
      default:
        return '';
        break;
    }
  }
}
