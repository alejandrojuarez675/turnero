import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Turno } from '../../../../shared/models/datos.models';
import { DateUtils } from '../../../../core/utils/date.utils';

export interface DialogData {
  turno: Turno;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  fecha = null;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.fecha = this.data.turno.fecha;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
