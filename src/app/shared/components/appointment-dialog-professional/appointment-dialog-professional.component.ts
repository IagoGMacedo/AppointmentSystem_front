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
import { Appointment, AppointmentForm, AppointmentUpdatePatient, AppointmentUpdateProfessional, StatusMapping, UserNameAndId } from '../../../core/types/userTypes';
import { MatChipsModule } from '@angular/material/chips';
import { NotificationService } from '../../../core/services/notification.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { UserService } from '../../../core/services/user.service';



export interface DialogData {
  title: string;
  id: number;
}

@Component({
  selector: 'app-appointment-dialog-professional',
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
  templateUrl: './appointment-dialog-professional.component.html',
  styleUrl: './appointment-dialog-professional.component.scss'
})
export class AppointmentDialogProfessionalComponent {
  readonly dialogRef = inject(MatDialogRef<AppointmentDialogProfessionalComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  times: string[] = [];

  editAppointment: Appointment | null = null;

  usersNamesAndIds: UserNameAndId[] = [];


  constructor(
    private formBuilderService: FormBuilder,
    private tokenService: TokenService,
    private appointmentService: AppointmentService,
    private notificationService: NotificationService,
    private userService : UserService
  ) {}

  appointmentForm = this.formBuilderService.group({
    user: [0,Validators.required],
    date: [new Date(), Validators.required],
    time: ['07:00:00', Validators.required],
  });

  ngOnInit(): void {
    this.generateTimes();
    this.generateUsersNamesAndIds();

    if (this.data.id > 0) {
      this.setAppointmentData(this.data.id);
    }
  }


  generateUsersNamesAndIds(){
    this.userService.getUsersNamesAndIds();

    this.userService.usersNamesAndIds$.subscribe((users) => {
      if(users){
        this.usersNamesAndIds = users;
        console.log("deu bom os users");
      }
    });
  }

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
    this.editAppointment!.status = 3;
    this.saveAppointment();
  }

  saveAppointment() {
    if (this.appointmentForm.valid) {
      console.log("entrei no save appointment");
      
          const dateControlValue = this.appointmentForm.controls.date.value;
          if (dateControlValue) {
            const formattedDate = dateControlValue.toISOString().split('T')[0];

            if (this.editAppointment) {
              console.log("vou editar");
              const appoinment: AppointmentUpdateProfessional= {
                userId: this.appointmentForm.controls.user.value!,
                appointmentTime: this.appointmentForm.controls.time.value!,
                appointmentDate: formattedDate,
                status: this.editAppointment.status
              };
              this.appointmentService.editAppointment(this.editAppointment.id, appoinment)
              .subscribe((result)=>{
                this.dialogRef.close(true);
                this.notificationService.showSucess("Agendamento editado com sucesso");
              })
            } else {
              const appoinment: AppointmentForm = {
                userId: this.appointmentForm.controls.user.value!,
                appointmentTime: this.appointmentForm.controls.time.value!,
                appointmentDate: formattedDate,
              };


              this.appointmentService
                .createAppointment(appoinment)
                .subscribe((result) => {
                  this.dialogRef.close(true);
                  this.notificationService.showSucess("Agendamento criado com sucesso");
                });
            }

          }
      
    }
  }

  setAppointmentData(id: number) {
    this.appointmentService.getAppointmentById(id).subscribe((appointment) => {
      if (appointment) {
        this.editAppointment = appointment as Appointment;

        console.log("vou preencher com esses valores:");
        console.log(this.editAppointment);
        if (this.editAppointment && this.editAppointment.userId && this.editAppointment.appointmentTime) {
          this.appointmentForm.patchValue({
            user: this.editAppointment.userId,
            date: new Date(`${appointment.appointmentDate} ${appointment.appointmentTime}`), // Convert string to Date
            time: this.editAppointment.appointmentTime,
          });
        }
      }
    });
  }

  get StatusString(): string {
    return StatusMapping[this.editAppointment!.status] || '';
  }
  
}
