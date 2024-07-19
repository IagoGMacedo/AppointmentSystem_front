import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { TokenService } from '../../core/services/token.service';
import { AppointmentService } from '../../core/services/appointment.service';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import { DatePipe } from '@angular/common';
import { AppointmentDialogProfessionalComponent } from '../../shared/components/appointment-dialog-professional/appointment-dialog-professional.component';
import { Appointment, StatusMapping } from '../../core/types/appointmentTypes';

@Component({
  selector: 'app-professional-home-page',
  standalone: true,
  imports: [MatTableModule, MatBadgeModule, DatePipe],
  templateUrl: './professional-home-page.component.html',
  styleUrl: './professional-home-page.component.scss'
})
export class ProfessionalHomePageComponent implements OnInit {
  appointments : Appointment[] = [];

  //'id'  'userId',
  displayedColumns: string[] = ['appointmentDate', 'appointmentTime', 'userName',
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
      this.appointmentService.getAllAppointments();
    }

    this.appointmentService.allAppointments$.subscribe(appointsments => {
      if(appointsments){
        this.appointments = appointsments;
      } else{
      }
    })
  }

  openDialog(code: number, title: string){
    var _dialog = this.dialog.open(AppointmentDialogProfessionalComponent, {
      width: '60%',
      height: '60%',
      data: code
    });


    _dialog.afterClosed().subscribe(result => {
      if(result)
        this.loadAppointments();

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
