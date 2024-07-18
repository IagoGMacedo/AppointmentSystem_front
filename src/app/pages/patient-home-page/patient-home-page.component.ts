import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { AppointmentDialogComponent } from '../../shared/components/appointment-dialog/appointment-dialog.component';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-patient-home-page',
  standalone: true,
  imports: [],
  templateUrl: './patient-home-page.component.html',
  styleUrl: './patient-home-page.component.scss'
})
export class PatientHomePageComponent {

  constructor(private dialog: MatDialog){

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
