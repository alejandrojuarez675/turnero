import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatosReserva } from '../../../../shared/models/datos.models';

export interface DialogData {
  datosReserva: DatosReserva;
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

  }
}
