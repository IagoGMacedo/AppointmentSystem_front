import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiEndpoint } from '../constants/constants';
import { Appointment, AppointmentForm, AppointmentUpdate } from '../types/userTypes';
import { AppointmentFilter } from '../types/formTypes';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private http: HttpClient,
  ) { }

  createAppointment(data: AppointmentForm) : Observable<AppointmentForm>{
    return this.http.post<AppointmentForm>(`${apiEndpoint.AppointmentEndpoint.create}`, data);
  }

  getAppointmentById(id : number) : Observable<Appointment>{
    return this.http.get<Appointment>(`${apiEndpoint.AppointmentEndpoint.getById}?id=${id}`);
  }
  

  private userAppointments = new BehaviorSubject<Appointment[]|null>(null);
  userAppointments$ = this.userAppointments.asObservable();

  getAppointmentsByUserId(userId : number){
    this.http.post<Appointment[]>(`${apiEndpoint.AppointmentEndpoint.filterAppointments}`, {userId: Number(userId)})
    .subscribe( (appointsments ) => {
      this.userAppointments.next(appointsments);
    });
  }

  editAppointment(id: number, data: AppointmentUpdate) : Observable<Appointment>{
    //const update : AppointmentUpdate = {appointmentDate: data.appointmentDate, appointmentTime: data.appointmentTime};
    return this.http.put<Appointment>(`${apiEndpoint.AppointmentEndpoint.updateByPatient}?idAppointment=${id}`, data);
  }
}
