import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as ReservaActions from '../../../../core/store/actions/reserva.actions';
import * as ReservacionActions from '../../../../core/store/actions/reservacion.actions';
import * as ReservacionSelectors from '../../../../core/store/selectors/reservacion.selectors';
import { Reserva } from '../../../../shared/models/datos.models';
import { ReservaEmailDialogComponent } from '../reserva-email-dialog/reserva-email-dialog.component';

@Component({
  selector: 'app-reserva-email',
  templateUrl: './reserva-email.component.html',
  styleUrls: ['./reserva-email.component.css']
})
export class ReservaEmailComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private store: Store<{ reservacion: Reserva }>,
  ) {
  }

  ngOnInit() {

    this.store.select(ReservacionSelectors.getReserva).pipe(
    // TODO cambiarlo por codigo reserva cuando ya esté funcionando bien
      filter(x => x != undefined && x.codigo != undefined)
      //filter(x => x !== undefined && x.paciente !== undefined && x.paciente.dni !== undefined)
    ).subscribe(x => {
      this.openDialog(x);
      }
    );
  }


  openDialog(reserva: Reserva): void {
    this.dialog.open(ReservaEmailDialogComponent, { data: { reserva: reserva }})
      .afterClosed().subscribe( () => {
        this.store.dispatch(ReservaActions.cleanStore());
        this.store.dispatch(ReservacionActions.cleanStore());
        this.store.dispatch(CalendarActions.cleanStore());
      });
  }

}
