import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as ReservaSelectors from '../../../../core/store/selectors/reserva.selectors';
import { ReservaFormulario, Reserva } from '../../../../shared/models/datos.models';
import { ReservaEmailDialogComponent } from '../reserva-email-dialog/reserva-email-dialog.component';

@Component({
  selector: 'reserva-email',
  templateUrl: './reserva-email.component.html',
  styleUrls: ['./reserva-email.component.css']
})
export class ReservaEmailComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private store: Store<{ reserva: ReservaFormulario }>,
  ) {
  }

  ngOnInit() {

    this.store.select(ReservaSelectors.getReserva).pipe(
    //TODO cambiarlo por codigo reserva cuando ya esté funcionando bien
      //filter(x => x !== undefined && x.reserva !== undefined && x.reserva.codigoReserva !== undefined)
      filter(x => x !== undefined && x.paciente !== undefined && x.paciente.dni !== undefined)
    ).subscribe(x => {
      this.openDialog(x);
      }
    );
  }


  openDialog(reservaConfirm: ReservaFormulario): void {
    this.dialog.open(ReservaEmailDialogComponent, { data: { reserva: reservaConfirm }})
      .afterClosed().subscribe( result => {
        if (result) {
          console.log("ingresa con " + result);
        } else {
          console.log("ingresa con " + result);
        }
      });
  }

}
