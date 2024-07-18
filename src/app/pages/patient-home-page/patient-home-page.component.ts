import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { AppointmentDialogComponent } from '../../shared/components/appointment-dialog/appointment-dialog.component';
import { TokenService } from '../../core/services/token.service';
import { AppointmentService } from '../../core/services/appointment.service';
import {MatTableModule} from '@angular/material/table';
import { Appointment } from '../../core/types/userTypes';

@Component({
  selector: 'app-patient-home-page',
  standalone: true,
  imports: [MatTableModule],
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
    this.tokenService.loggedUser.subscribe((user) => {
      if(user){
        console.log("mandei fazer a requisição");
        this.appointmentService.getAppointmentsByUserId(user.id);
      } else{
        console.log("ta duro dog");
      }
    })

    this.appointmentService.userAppointments$.subscribe(appointsments => {
      if(appointsments){
        console.log("pode fazer o L");
        this.appointments = appointsments;
      }
    })
  }

  openDialog(code: number, title: string){
    var _dialog = this.dialog.open(AppointmentDialogComponent, {
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
      //fazer requisição para buscar novos resultados aqui
    })
  }

  editAppointment(id: number){
    this.openDialog(id, "Editar agendamento");
  }

  createAppointment(){
    this.openDialog(0, "Marcar agendamento");
  }

}
