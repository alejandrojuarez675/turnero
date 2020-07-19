import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Turno, ProfesionalEspecialidad } from '../../../../shared/models/datos.models';
import { DateUtils } from '../../../../core/utils/date.utils';

export interface DialogData {
  profesional: ProfesionalEspecialidad;
}

@Component({
  selector: 'app-observation-dialog',
  templateUrl: './observation-dialog.component.html',
  styleUrls: ['./observation-dialog.component.css']
})
export class ObservationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ObservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
