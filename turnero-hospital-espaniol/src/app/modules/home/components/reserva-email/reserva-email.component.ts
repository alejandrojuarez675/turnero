import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as ReservaActions from '../../../../core/store/actions/reserva.actions';
import * as ReservacionActions from '../../../../core/store/actions/reservacion.actions';
import * as ReservaSelectors from '../../../../core/store/selectors/reserva.selectors';
import * as ReservacionSelectors from '../../../../core/store/selectors/reservacion.selectors';
import { DatosReserva, Reserva, ReservaFormulario } from '../../../../shared/models/datos.models';
import { ReservaEmailDialogComponent } from '../reserva-email-dialog/reserva-email-dialog.component';

@Component({
  selector: 'app-reserva-email',
  templateUrl: './reserva-email.component.html',
  styleUrls: ['./reserva-email.component.css']
})
export class ReservaEmailComponent implements OnInit {

  datosReserva: DatosReserva;
  reserva$: Observable<ReservaFormulario>;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private store: Store<{ reservacion: Reserva }>,
  ) {

  }

  ngOnInit() {

    this.datosReserva = new DatosReserva();
    this.subscription = this.store.select(ReservacionSelectors.getReserva).pipe(
      filter(x => x != undefined && x.codigo != undefined)
    ).subscribe(x => {
      this.reserva$ = this.store.select(ReservaSelectors.getReserva);
      this.reserva$.subscribe(reserva => this.datosReserva.paciente = reserva.paciente);
      this.datosReserva.reserva = x;
      this.openDialog(this.datosReserva);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(datosReserva: DatosReserva): void {
    this.dialog.open(ReservaEmailDialogComponent, { data: { datosReserva: datosReserva }})
      .afterClosed().subscribe( () => {
        this.store.dispatch(ContextoActions.setEstado({ newEstado: 1}));
        this.store.dispatch(ContextoActions.cleanStore());
        this.store.dispatch(CalendarActions.cleanStore());
        this.store.dispatch(ReservaActions.cleanStore());
        this.store.dispatch(ReservacionActions.cleanStore());
      });
  }

}
