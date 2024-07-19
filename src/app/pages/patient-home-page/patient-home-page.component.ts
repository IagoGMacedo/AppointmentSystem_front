import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { TokenService } from '../../core/services/token.service';
import { AppointmentService } from '../../core/services/appointment.service';
import {MatTableModule} from '@angular/material/table';
import { Appointment, StatusMapping } from '../../core/types/userTypes';
import {MatBadgeModule} from '@angular/material/badge';
import { DatePipe } from '@angular/common';
import { AppointmentDialogPatientComponent } from '../../shared/components/appointment-dialog-patient/appointment-dialog-patient.component';

@Component({
  selector: 'app-patient-home-page',
  standalone: true,
  imports: [MatTableModule, MatBadgeModule, DatePipe],
  templateUrl: './patient-home-page.component.html',
  styleUrl: './patient-home-page.component.scss'
})
export class PatientHomePageComponent implements OnInit {

  appointments : Appointment[] = [];

  // 'id', 'userId',
  displayedColumns: string[] = [ 'appointmentDate', 'appointmentTime', 
    'status', 'dateOfCreation', '#'
  ];

  constructor(private dialog: MatDialog, private appointmentService: AppointmentService,
    private tokenService: TokenService
  ){
    
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(){
    const user = this.tokenService.getLoggedUser()
    if(user){
      this.appointmentService.getAppointmentsByUserId(user.id);
    }
    
      
    

    this.appointmentService.userAppointments$.subscribe(appointsments => {
      if(appointsments){
        this.appointments = appointsments;
      }
    })
  }

  openDialog(code: number, title: string){
    var _dialog = this.dialog.open(AppointmentDialogPatientComponent, {
      width: '60%',
      height: '60%',
      data: code
    });

    //posso passar uma função no construtor de AppointmentDialogComponent
    //pode ser de salvar ou editar

    _dialog.afterClosed().subscribe(result => {
      if(result)
        this.loadAppointments();

      //fazer requisição para buscar novos resultados aqui
    })
  }

  editAppointment(id: number){
    this.openDialog(id, "Editar agendamento");
  }

  createAppointment(){
    this.openDialog(0, "Marcar agendamento");
  }

  getStatusString(id: number): string {
    return StatusMapping[id] || '';
  }

}
