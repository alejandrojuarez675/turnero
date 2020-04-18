import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Turno, ReservaFormulario, Reserva } from '../../../../shared/models/datos.models';
import { DateUtils } from '../../../../core/utils/date.utils';

export interface DialogData {
  reserva: Reserva;
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
