import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { TokenService } from '../../core/services/token.service';
import { AppointmentService } from '../../core/services/appointment.service';
import {MatTableModule} from '@angular/material/table';
import { Appointment, StatusMapping } from '../../core/types/userTypes';
import {MatBadgeModule} from '@angular/material/badge';
import { DatePipe } from '@angular/common';
import { AppointmentDialogProfessionalComponent } from '../../shared/components/appointment-dialog-professional/appointment-dialog-professional.component';

@Component({
  selector: 'app-professional-home-page',
  standalone: true,
  imports: [MatTableModule, MatBadgeModule, DatePipe],
  templateUrl: './professional-home-page.component.html',
  styleUrl: './professional-home-page.component.scss'
})
export class ProfessionalHomePageComponent implements OnInit {
  appointments : Appointment[] = [];

  //  'userId',
  displayedColumns: string[] = ['id', 'appointmentDate', 'appointmentTime', 'userName',
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
    /* 
    this.tokenService.loggedUser$.subscribe((user) => {
      if(user){
        console.log("mandei fazer a requisição")
        this.appointmentService.getAllAppointments();
      } else{
      }
    })
    */

    const user = this.tokenService.getLoggedUser()
    if(user){
      console.log("mandei fazer a requisição");
      this.appointmentService.getAllAppointments();
    }

    this.appointmentService.allAppointments$.subscribe(appointsments => {
      if(appointsments){
        console.log("pode fazer o L");
        this.appointments = appointsments;
      } else{
        console.log("ta duro dog");
      }
    })
  }

  openDialog(code: number, title: string){
    var _dialog = this.dialog.open(AppointmentDialogProfessionalComponent, {
      width: '60%',
      height: '60%',
      data: {
        title: title,
        id: code
      }
    });

    //posso passar uma função no construtor de AppointmentDialogComponent
    //pode ser de salvar ou editar

    _dialog.afterClosed().subscribe(result => {
      console.log("printando resultado");
      console.log(result);
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
