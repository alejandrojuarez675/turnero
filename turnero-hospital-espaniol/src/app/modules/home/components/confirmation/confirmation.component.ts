import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as ReservaActions from '../../../../core/store/actions/reserva.actions';
import * as ReservaSelectors from '../../../../core/store/selectors/reserva.selectors';
import { Calendario, Turno, ReservaFormulario } from '../../../../shared/models/datos.models';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private store: Store<{ calendario: Calendario }>,
  ) {
  }

  ngOnInit() {
    this.store.select(ReservaSelectors.getReserva).pipe(
      filter(x => x !== undefined && x.codigoReserva !== undefined)
    ).subscribe(x => {
      console.log("aca se va a abrir el popup con el id de la reserva "  + x.codigoReserva);
      }
    );
  }


  openDialog(reserva: ReservaFormulario): void {
    this.dialog.open(ConfirmationDialogComponent, { data: { turno: reserva }})
      .afterClosed().subscribe( result => {
        if (result) {
          console.log("ingresa con " + result);
        } else {
          this.store.dispatch(CalendarActions.setTurnoSelected(undefined));
        }
      });
  }

}
