import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Turno, ReservaFormulario, Reserva } from '../../../../shared/models/datos.models';
import { DateUtils } from '../../../../core/utils/date.utils';

export interface DialogData {
  reserva: ReservaFormulario;
}

@Component({
  selector: 'app-reserva-email-dialog',
  templateUrl: './reserva-email-dialog.component.html',
  styleUrls: ['./reserva-email-dialog.component.css']
})
export class ReservaEmailDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReservaEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    console.log("ENTRA AL MODAL " + this.data);
    console.log("RESERVA OBJECT " + this.data.reserva);
    console.log("PACIENTE " + this.data.reserva.paciente);
    console.log("PACIENTE MAIL " + this.data.reserva.paciente.mail);

    if (this.data.reserva.reserva === undefined){
      console.log("RESERVA ES NULL");
    }
    //this.fecha = this.data.turno.fecha;
  }
}
